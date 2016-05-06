import { HTTP } from 'meteor/http';
import {Summoners} from '../api/summoner.js'



export const getSummonerByName = function(region, summonerName){
    if(Meteor.isServer){
        const server = Meteor.settings.riot.apiserver;
        const key = Meteor.settings.riot.key;
        try {
            var data = HTTP.get('https://' + region.slug + '.' + server + '/api/lol/' + region.slug + '/v1.4/summoner/by-name/' + summonerName, {
                params: {
                    "api_key": key
                }
            });
            console.log(data);
            var riotData = data.data[summonerName];
            var doesHeAlreadyExist = Summoners.findOne({'data.id': riotData.id});
            if(doesHeAlreadyExist){
                return doesHeAlreadyExist;
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
export const getSummonerById = function(region, summonerName, next){
    if(Meteor.isServer){
        HTTP.get('https://' + region.slug + '.' + server + '/api/lol/' + region.slug + '/v1.4/summoner/by-name/' + summonerName, {
            params: {
                "api_key": key
            }
        }, function (error, data) {
            if (error) {
                console.log(error);
                throw new Meteor.Error(error);
            }
            console.log(data);
            var riotData = data.data[summonerName];
            var doesHeAlreadyExist = Summoners.findOne({'data.id': riotData.id});
            console.log(doesHeAlreadyExist);
            if(doesHeAlreadyExist){
                next(null, doesHeAlreadyExist);
            }
            var summoner = {
                data: riotData,
                region: region.slug
            };
            Summoners.insert(summoner);
            next(null, summoner);
        });
    }
};