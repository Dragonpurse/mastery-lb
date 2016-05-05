import { HTTP } from 'meteor/http';
import {Summoners} from '../api/summoner.js'
if (Meteor.isServer) {
    server = Meteor.settings.riot.apiserver;
    key = Meteor.settings.riot.key;
}

export const getSummonerByName = function(region, summonerName, callback){
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
                return doesHeAlreadyExist;
            }
            var summoner = {
                data: riotData,
                region: region.slug
            };
            Summoners.insert(summoner);
            return summoner;
        });
    }
};
export const getSummonerById = function(region, summonerName, callback){
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
                return doesHeAlreadyExist;
            }
            summoner = {
                data: riotData,
                region: region.slug
            };
            Summoners.insert(summoner);
            return summoner;
        });
    }
};