import { Champions } from '../../imports/api/champion.js';
import { HTTP } from 'meteor/http';
var server = Meteor.settings.riot.apiserver;
var key = Meteor.settings.riot.key;

export default function () {
    //Champions.insert(champion);
    HTTP.get(server + '/api/lol/static-data/euw/v1.2/champion',{
        params: {
            "api_key": key
        }
    }, function(error,data){
        if(error){
            console.log(error);
        }
        var champions = data.data.data;
        for (var property in champions) {
            if (champions.hasOwnProperty(property)) {
                var champion = champions[property];
                var existingChampion = Champions.findOne({key:champion.key});
                if(!existingChampion){
                    Champions.insert(champion);
                }
            }
        }

    })
}
