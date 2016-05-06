import { HTTP } from 'meteor/http';
import {ChampionMastery} from '../api/championMastery.js'


export const updateChampionMasteries = function(region, summonerId){
    if(Meteor.isServer){
        const server = Meteor.settings.riot.apiserver;
        const key = Meteor.settings.riot.key;

        HTTP.get('https://' + region.slug + '.' + server + '/championmastery/location/' + region.regionId + '/player/' + summonerId + '/champions', {
            params: {
                "api_key": key
            }
        }, function(err, data){
            if(err){
                console.log(err);
            }else{
                var championMasteries = data.data;
                championMasteries.forEach(function(championMastery){
                    var existing = ChampionMastery.findOne({
                        'data.playerId': summonerId,
                        'data.championId': championMastery.championId,
                        region: region.slug
                    });
                    if(existing){
                        console.log('updating');

                    }else{
                        console.log('Inserting');
                        var mastery = {
                            region: region.slug,
                            data: championMastery
                        };
                        ChampionMastery.insert(mastery);
                    }
                })
            }
        });


    }
};
