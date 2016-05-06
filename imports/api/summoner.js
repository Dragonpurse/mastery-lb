export const Summoners = new Mongo.Collection('summoners');
import {getSummonerByName} from '../riot/summoner.js';

if(Meteor.isServer){
    var Future = Npm.require('fibers/future');
    Meteor.methods({
        'summoner.search'(region, summonerName) {

            check(summonerName, String);
            check(region, Object);

            var future = new Future();

            var summoner = Summoners.findOne(
                {
                    region: region.slug,
                    'data.name': {$regex: summonerName,  $options: 'i'}
                });
            if (summoner) {
                return summoner;
            } else {
                getSummonerByName(region, summonerName, function(error, summoner){
                    if ( error ) {
                        console.log(error);
                        future.return( error );
                    } else {
                        console.log(summoner);
                        future.return( summoner );
                    }
                })
            }
            return future.wait();
        }
    });
}


