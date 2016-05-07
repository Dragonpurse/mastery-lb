import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Regions } from '../../../imports/api/region.js';
import { Counts } from '../../../imports/api/counts.js';
import { Summoners } from '../../../imports/api/summoner';

export default function (Template) {

    var leaderboardsHandler,
        championHandler;

    Template.leaderboard.onCreated(function () {
        Session.set('pageSize', 10);
        var championId = parseInt(FlowRouter.getParam("championId"));
        var page = parseInt(FlowRouter.getQueryParam('page'));
        Session.set('selectedRegions', [Session.get('selectedRegion').slug]);
        if(page){
            Session.set('page', page);
        }else{
            Session.set('page', 0);
        }

        Session.set('pageSize', 10);

        Meteor.subscribe('allSummoners');
        Meteor.subscribe('regions');
        Meteor.subscribe('leaderBoardsCount', 'euw', championId);
        Tracker.autorun(function () {
          leaderboardsHandler = Meteor.subscribe('ChampionLeaderBoards', Session.get('selectedRegions'), championId, Session.get('pageSize'), Session.get('page'));
        });
        championHandler = Meteor.subscribe('champions', '');
    });


    Template.leaderboard.helpers({
        board() {
            let championId = parseInt(FlowRouter.getParam("championId"));
            return ChampionMastery.find({
                "data.championId": championId,
                region: {$in: Session.get('selectedRegions')}
            },{sort:{"data.championPoints": -1}});
        },
        champion() {
          return Champions.findOne({id:parseInt(FlowRouter.getParam("championId"))});
        },    
        regions() {
            return Regions.find();
        },
        pages(){
            let championId = parseInt(FlowRouter.getParam("championId"));
            let count = Counts.findOne({ type: 'leaderboard' });
            let pageSize = Session.get('pageSize');
            if(count){
                let pageCount = Math.ceil(count.summonerCount/pageSize);
                let counter = 0;
                var pages =[];
                while(counter < pageCount){
                    pages.push({
                        url: getUrl(counter,championId),
                        name: counter
                    });
                    counter ++;
                }
                return [];
            }else{
                return [];
            }
        },
        next(){
            let championId = parseInt(FlowRouter.getParam("championId"));
            let count = Counts.findOne({ type: 'leaderboard' });
            let pageSize = Session.get('pageSize');
            if(count) {
                let page =Session.get('page');
                let pageCount = Math.ceil(count.summonerCount / pageSize);
                if(page+1 < pageCount){
                    return getUrl(page+1,championId);
                }
            }
        },
        prev(){
            let championId = parseInt(FlowRouter.getParam("championId"));
            let count = Counts.findOne({ type: 'leaderboard' });
            if(count) {
                let page =Session.get('page');
                if(page != 0){
                    return getUrl(page-1,championId);
                }
            }
        },
        position(index){
            let page =Session.get('page');
            let pageSize = Session.get('pageSize');
            return (pageSize * page) + 1 + index     ;
        }

    });

    Template.leaderboard.events({
        'click #prev'(){
          Session.set('page', Session.get('page') -1);
        },
        'click #next'(){
          Session.set('page', Session.get('page') +1);
        }
    });

    Template.leaderboard.onDestroyed(function () {
        leaderboardsHandler.stop();
    });
}

function getUrl(counter, championId){
    return '/leaderboard/' + championId + '?page='+counter;
}
