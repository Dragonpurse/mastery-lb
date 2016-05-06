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
    Meteor.publish('SummonerChampionMastery', function (region, summonerId, searchQuery) {
        check(region, String);
        check(summonerId, Number);
        check(searchQuery, String);

        var champions;
        if (searchQuery && searchQuery.length > 1) {
            champions = Champions.find({
                'name': {$regex: searchQuery,  $options: 'i'}
            });
        }else{
            champions = Champions.find({});
        }

        var championIds = champions.map(function(p) { return p.id });

        var masteries = ChampionMastery.find({
            "data.playerId": summonerId,
            'data.championId': {$in: championIds},
            region: region,
        });
        if(masteries.count() == 0 && searchQuery.length == 0){
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


