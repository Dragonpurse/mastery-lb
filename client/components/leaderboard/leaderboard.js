import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Regions } from '../../../imports/api/region.js';
import { Counts } from '../../../imports/api/counts.js';
import { Summoners } from '../../../imports/api/summoner';

export default function (Template) {

    let summonerId, championId, masteryHandler;
    Template.leaderboard.onCreated(function () {
        Session.set('pageSize', 10);
        championId = parseInt(FlowRouter.getParam("championId"));
        let page = parseInt(FlowRouter.getQueryParam('page'));
        summonerId = parseInt(FlowRouter.getQueryParam('summoner'));
        let regionSlug = FlowRouter.getQueryParam('region');

        if(regionSlug){
            Session.set('selectedRegions', [regionSlug]);
        }else{
            Session.set('selectedRegions', [Session.get('selectedRegion').slug]);
        }

        if(page){
            Session.set('page', page);
        }else{
            Session.set('page', 0);
        }
        Session.set('pageSize', 10);

        //determine summoner position in case it is entered
        if(summonerId && regionSlug) {
            Session.set('summonerId', summonerId);
            Meteor.call('getLeaderBoardPosition', championId, regionSlug, summonerId, function(error, position){
                if(error){
                    console.log(error);
                }else{
                    let summonerOnPage = Math.floor(position/Session.get('pageSize'));
                    Session.set('page', summonerOnPage);
                }
            });
        }
        Tracker.autorun(function () {
            Meteor.subscribe('leaderBoardsCount', Session.get('selectedRegions'), championId);
            masteryHandler = Meteor.subscribe('ChampionLeaderBoards', Session.get('selectedRegions'), championId, Session.get('pageSize'), Session.get('page'));
        });

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
        summonerCount(){
            return Counts.findOne({ type: 'leaderboard' })
        },
        next(summonerCount){
            let championId = parseInt(FlowRouter.getParam("championId"));
            let pageSize = Session.get('pageSize');
            let page =Session.get('page');
            let pageCount = Math.ceil(summonerCount / pageSize);
            if(page+1 < pageCount){
                return getUrl(page+1,championId);
            }

        },
        prev(){
            let championId = parseInt(FlowRouter.getParam("championId"));
            let page =Session.get('page');
            if(page != 0){
                return getUrl(page-1,championId);
            }
        },
        position(index){
            let page =Session.get('page');
            let pageSize = Session.get('pageSize');
            return (pageSize * page) + 1 + index     ;
        },
        isSelectedPageSize(size) {
          return Session.get('pageSize') == size;
        },
        highlightSummoner(summonerId) {
            return Session.get('summonerId') === summonerId;
        }
    });

    Template.leaderboard.events({
        'click #prev'(){
          Session.set('page', Session.get('page') -1);
        },
        'click #next'(){
          Session.set('page', Session.get('page') +1);
        },
        'click .items-per-page li'(event){
          Session.set('pageSize', event.target.value);
        }
    });
    Template.leaderboard.onDestroyed(function(){
        masteryHandler.stop();
    });

}

function getUrl(counter, championId){
    return '/leaderboard/' + championId + '?page='+counter;
}
