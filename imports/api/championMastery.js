export const ChampionMastery = new Mongo.Collection('championMastery');
import {updateChampionMasteries} from '../riot/championMastery';
import {Champions} from './champion';
import {Summoners} from './summoner';
import {Regions} from './region.js';

ChampionMastery.helpers({
    champion: function(){
        return Champions.findOne({id:this.data.championId});
    },
    summoner:function(){
        return Summoners.findOne({id:this.data.playerId})
    }
});
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

    Meteor.publish('ChampionLeaderBoards', function (region, championId, size, offset) {
        check(region, String);
        check(championId, Number);
        check(size, Number);
        check(offset, Number);

        var champions= ChampionMastery.find({
            "data.championId": championId,
            region: region
        }, {
            limit : size,
            offset: size * offset
        });
        return champions
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


