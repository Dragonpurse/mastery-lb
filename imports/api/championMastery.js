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
    var Future = Npm.require('fibers/future');
    // This code only runs on the server
    Meteor.publish('SummonerChampionMastery', function (region, summonerId) {
        check(region, String);
        check(summonerId, Number);

        let champions = Champions.find({});

        var championIds = champions.map(function(p) { return p.id });
        let masteries = ChampionMastery.find({
            "data.playerId": summonerId,
            'data.championId': {$in: championIds},
            region: region
        });

        if(masteries.count() == 0){
            var regionObject = Regions.findOne({slug:region});
            updateChampionMasteries(regionObject,summonerId);
        }
        return masteries;
    });

    Meteor.publish('ChampionLeaderBoards', function (regions, championId, size, offset) {
        check(regions, Array);
        check(championId, Number);
        check(size, Number);
        check(offset, Number);

        return ChampionMastery.find({
            "data.championId": championId,
            region: {$in: regions}
        }, {
            sort: {"data.championPoints": -1},
            limit: size,
            skip: size * offset
        });
    });

    Meteor.publish("leaderBoardsCount", function (regions, championId) {
        check(regions, Array);
        check(championId, Number);
        let subscription = this;
        let summonerCount = ChampionMastery.find({
            "data.championId": championId,
            region: {$in: regions}
        }).count();
        let countObject = {};
        countObject.summonerCount = summonerCount;
        countObject.type = 'leaderboard'; // should be added because all your counts will be contained in one collection

        subscription.added('counts', Random.id(), countObject);
        subscription.ready();
    });
}
Meteor.methods({
    'updateSummonerStats'(regionSlug, summonerId) {
        check(regionSlug, String);
        check(summonerId, String);
        if(Meteor.isServer){
            let region = Regions.findOne({slug:regionSlug});
            updateChampionMasteries(region,summonerId);

        }
    },
    'getLeaderBoardPosition'(championId, regionSlug, summonerId){
        check(regionSlug, String);
        check(summonerId, Number);
        check(championId, Number);
        if(Meteor.isServer){
            var future = new Future();
            let championMasteries = ChampionMastery.find({
                "data.championId": championId,
                region: regionSlug
            },{sort: {"data.championPoints": -1}});

            championMasteries.forEach(function(mastery, index){
                if(mastery.region === regionSlug && mastery.data.playerId == summonerId){
                    future.return(index);
                }
            });
            return future.wait();
        }
    },
    'refreshMasteries'(region, summonerId){
        check(region, String);
        check(summonerId, Number);
        let regionObject = Regions.findOne({slug:region});
        let summoner = Summoners.findOne({
            id: summonerId,
            region: region
        });
        if(!summoner.hasOwnProperty('statsRefreshedAt')){
            summoner.statsRefreshedAt = new Date();
            Summoners.update(summoner._id, summoner);
            updateChampionMasteries(regionObject,summonerId);
        }else {
            var minutes = moment(new Date()).diff(moment(summoner.statsRefreshedAt), 'minutes');
            if(minutes > 60){
                summoner.statsRefreshedAt = new Date();
                Summoners.update(summoner._id, summoner);
                updateChampionMasteries(regionObject,summonerId);
            }
        }


        //
    }
});



