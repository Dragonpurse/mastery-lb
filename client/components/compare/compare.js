import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Champions } from '../../../imports/api/summoner';
export default function (Template) {
    let masteryHandler1, masteryHandler2;

    Template.compare.onCreated(function () {
        let region1 = FlowRouter.getParam("region");
        let summonerId1 = parseInt(FlowRouter.getParam("summonerId"));
        let region2 = FlowRouter.getParam("region2");
        let summonerId2 = parseInt(FlowRouter.getParam("summonerId2"));
        Session.set('summoner1',{
            id: summonerId1,
            region: region1
        });
        Session.set('summoner2',{
            id: summonerId2,
            region: region2
        });
        Meteor.subscribe('regions');
        //To load champion details
        Meteor.subscribe('summoners', summonerId1);
        Meteor.subscribe('summoners', summonerId2);
        Meteor.subscribe("champions", '');
        Session.set('championSearch', '');
        Tracker.autorun(function () {
            masteryHandler1 = Meteor.subscribe('SummonerChampionMastery', region1, summonerId1, Session.get('championSearch'), false);
            masteryHandler2 = Meteor.subscribe('SummonerChampionMastery', region2 , summonerId2, Session.get('championSearch'), false);
        });
    });
    Template.compare.helpers({
       masteries(){
           return ChampionMastery.find({});
       },
        champions(){
            return Champions.find({},{sort:{name: 1}});
        },
        hasChampion(){
            return ChampionMastery.find({
                "data.championId": this.id
            }).count() > 0
        },
        masteriesSummoner1(){
            let summoner = Session.get('summoner1');
            return ChampionMastery.findOne({
                "data.championId": this.id,
                "data.playerId": summoner.id,
                region: summoner.region
            })
        },
        masteriesSummoner2(){
            let summoner = Session.get('summoner2');
            return ChampionMastery.findOne({
                "data.championId": this.id,
                "data.playerId": summoner.id,
                region: summoner.region
            })
        },
        summoner1(){
            let summoner = Session.get('summoner2');
            S
        },
        summoner2(){
            let summoner = Session.get('summoner1');
        }
    });

    Template.compare.onDestroyed(function(){
        masteryHandler.stop();
    })
}