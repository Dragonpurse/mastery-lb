import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Summoners } from '../../../imports/api/summoner.js';
export default function (Template) {

  var region, summonerId;

  Template.summoner.onCreated(function () {
    region = FlowRouter.getParam("region");
    summonerId = parseInt(FlowRouter.getParam("summonerId"));
    Meteor.subscribe('regions');
    Meteor.subscribe('SummonerChampionMastery', region , summonerId);
    //To load champion details
    Meteor.subscribe('champions', '');
    Meteor.subscribe('summoners', summonerId);
  });

  Template.summoner.helpers({
    stats() {
      return ChampionMastery.find({},{sort:{"data.championPoints": -1}});
    },
    summoner(){
      return Summoners.findOne({});
    }
  })
}

