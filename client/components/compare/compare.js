import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Summoners } from '../../../imports/api/summoner';
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
        Meteor.subscribe('champions');
        Session.set('championSearch', '');
        Meteor.subscribe('SummonerChampionMastery', region1, summonerId1);
        Meteor.subscribe('SummonerChampionMastery', region2 , summonerId2);
    });
    Template.compare.helpers({
       masteries(){
           return ChampionMastery.find({});
       },
        champions(){
            return Champions.find({
                'name': {$regex: Session.get('championSearch'),  $options: 'i'}
            },{sort:{name: 1}});
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
            let summoner = Session.get('summoner1');
            return Summoners.findOne({
                id: summoner.id,
                region: summoner.region
            })
        },
        summoner2(){
            let summoner = Session.get('summoner2');
            return Summoners.findOne({
                id: summoner.id,
                region: summoner.region
            })
        },
        compareScores(summoner1championPoints, summoner2championPoints) {
            if(!summoner1championPoints){
                return false;
            }
            if(!summoner2championPoints){
                return true;
            }
            return summoner1championPoints.data.championPoints > summoner2championPoints.data.championPoints;
        }
    });

    Template.compare.events({
      'keyup #champion-search'(event){
        Session.set('championSearch', event.target.value);
      }
    });
}