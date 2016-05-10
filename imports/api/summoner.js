export const Summoners = new Mongo.Collection('summoners');
import {getSummonerByName} from '../riot/summoner.js';

if(Meteor.isServer){
    var Future = Npm.require('fibers/future');

    Meteor.publish('allSummoners', function () {
        return Summoners.find();
    });

    Meteor.publish('listOfSummoners', function(summonerIds){
       check(summonerIds, Array);
        return Summoners.find({
            id: {$in: summonerIds}
        })
    });
    Meteor.publish('summoners', function (summonerId) {
        check(summonerId, Number);
        return Summoners.find({
            id: summonerId
        });
    });

    Meteor.methods({
        'summoner.search'(region, summonerName) {

            check(summonerName, String);
            check(region, Object);

            var future = new Future();

            var summoner = Summoners.findOne(
                {
                    region: region.slug,
                    'name': {$regex: summonerName,  $options: 'i'}
                });
            if (summoner) {
                future.return( summoner );
            } else {
                getSummonerByName(region, summonerName, function(error, summoner){
                    if ( error ) {
                        future.throw( error );
                    } else {
                        future.return( summoner );
                    }
                })
            }
            try {
                return future.wait();
            }
            catch(err) {
                // Replace this with whatever you want sent to the client.
                throw new Meteor.Error("http-error", err);
            }
        }
    });
}


