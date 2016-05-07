import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Summoners } from '../../../imports/api/summoner.js';
export default function (Template) {

  let region, summonerId, masteryHandler;

  Template.summoner.onCreated(function () {
    region = FlowRouter.getParam("region");
    summonerId = parseInt(FlowRouter.getParam("summonerId"));
    Meteor.subscribe('regions');
    //To load champion details
    Meteor.subscribe('summoners', summonerId);
    Meteor.subscribe("champions", '');
    Session.set('championSearch', '');
    Session.set('chestGranted', false);
    Tracker.autorun(function () {
       masteryHandler = Meteor.subscribe('SummonerChampionMastery', region , summonerId, Session.get('championSearch'), Session.get('chestGranted'));
    });
  });

  Template.summoner.events({
    'keyup #champion-search'(event){
      Session.set('championSearch', event.target.value);
    },
    'click #hide-redeemed'(event){
      Session.set('chestGranted', event.target.checked);
    }
  });

  Template.summoner.helpers({
    stats() {
      return ChampionMastery.find({
        "data.playerId": summonerId,
        region: region
      },{sort:{"data.championPoints": -1}});
    },
    summoner(){
      return Summoners.findOne({});
    }
  });

  Template.summoner.onDestroyed(function(){
    console.log('banaan');
    masteryHandler.stop();
  })
}

