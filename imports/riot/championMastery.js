import { HTTP } from 'meteor/http';
import {ChampionMastery} from '../api/championMastery.js'
if (Meteor.isServer) {
    server = Meteor.settings.riot.apiserver;
    key = Meteor.settings.riot.key;
}

export const getChampionMasteries = function(region, summonerId){
    if(Meteor.isServer){
        try {
            var data = HTTP.get('https://' + region.slug + '.' + server + '/championmastery/location/' + region + '/player/' + summonerId + '/champions', {
                params: {
                    "api_key": key
                }
            });
            console.log(data);
            var riotData = data.data[summonerName];
            var doesHeAlreadyExist = Summoners.findOne({'data.id': riotData.id});
            if(doesHeAlreadyExist){
                next(null, doesHeAlreadyExist);
            }
            var summoner = {
                data: riotData,
                region: region.slug
            };
            summoner = Summoners.insert(summoner);

            return summoner;
        } catch (e) {
            throw new Meteor.Error('summoner-not-found');
        }
    }
};
