import { HTTP } from 'meteor/http';
import {Summoners} from '../api/summoner.js'



export const getSummonerByName = function(region, summonerName, next){
    if(Meteor.isServer){
        const server = Meteor.settings.riot.apiserver;
        const key = Meteor.settings.riot.key;
        summonerName = encodeURI(summonerName);
        HTTP.get('https://' + region.slug + '.' + server + '/api/lol/' + region.slug + '/v1.4/summoner/by-name/' + summonerName, {
            params: {
                "api_key": key
            }
        }, function(error, data){
            if(error){
                next(error, null);
            }else{
                var summonerData = data.data;
                for (var property in summonerData) {
                    if (summonerData.hasOwnProperty(property)) {
                        var summoner = summonerData[property];
                        var doesHeAlreadyExist = Summoners.findOne({'id': summoner.id});
                        if(doesHeAlreadyExist){
                            next(null, doesHeAlreadyExist);
                        }else{
                            summoner.region = region.slug;
                            Summoners.insert(summoner);

                            next(null, summoner);
                        }
                    }
                }
            }
        });
    }
};