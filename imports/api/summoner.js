export const Summoners = new Mongo.Collection('summoners');
import {getSummonerByName} from '../riot/summoner.js';


Meteor.methods({
    'summoner.search'(region, summonerName) {

        check(summonerName, String);
        check(region, Object);

        var summoner = Summoners.findOne(
            {
                region: region.slug,
                'data.name': {$regex: summonerName,  $options: 'i'}
            });
        if (summoner) {
            return summoner;
        } else {
            return getSummonerByName(region, summonerName)
        }
    }
});
