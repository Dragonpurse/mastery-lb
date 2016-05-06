export const ChampionMastery = new Mongo.Collection('championMastery');
import {updateChampionMasteries} from '../riot/championMastery';
import {Regions} from './region.js';
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('SummonerChampionMastery', function (region, summonerId) {
        check(region, String);
        check(summonerId, Number);
        var masteries = ChampionMastery.find({
            "data.playerId": summonerId,
            region: region
        });
        if(masteries.count() == 0){
            var regionObject = Regions.findOne({slug:region});
            updateChampionMasteries(regionObject,summonerId);
        }
        return masteries;
    });

    Meteor.publish('ChampionLeaderBoards', function (region, championId) {
        check(region, String);
        check(championId, String);
        return ChampionMastery.find({
            "data.championId": championId,
            region: region
        });
    });

}
Meteor.methods({
    'updateSummonerStats'(regionSlug, summonerId) {
        check(regionSlug, String);
        check(summonerId, String);
        if(Meteor.isServer){
            var region = Regions.findOne({slug:regionSlug});
            updateChampionMasteries(region,summonerId);
        }

    }
});


