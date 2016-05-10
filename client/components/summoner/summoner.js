import { ChampionMastery } from '../../../imports/api/championMastery.js';
import { Champions } from '../../../imports/api/champion.js';
import { Summoners } from '../../../imports/api/summoner.js';
import { Regions } from '../../../imports/api/region.js';

export default function (Template) {

  let region, summonerId, masteryHandler;

  Template.summoner.onCreated(function () {
    region = FlowRouter.getParam("region");
    summonerId = parseInt(FlowRouter.getParam("summonerId"));
    //To load champion details
    Meteor.subscribe('summoners', summonerId);

    Session.set('championSearch', '');
    Session.set('chestGranted', false);
    masteryHandler = Meteor.subscribe('SummonerChampionMastery', region , summonerId);
  });

  Template.summoner.events({
    'keyup #champion-search'(event){
      Session.set('championSearch', event.target.value);
    },
    'click #hide-redeemed'(event){
      Session.set('chestGranted', event.target.checked);
    },
    'click .region'() {
      Session.set( "selectedCompareRegion", this);
    },
    'click #refresh-stats'() {
        region = FlowRouter.getParam("region");
        summonerId = parseInt(FlowRouter.getParam("summonerId"));
        Meteor.call('refreshMasteries', region, summonerId);
    },
    'submit .compare-summoner-search'(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const target = event.target;
      const summonerName = target.summonerName.value;

      Meteor.call('summoner.search', Session.get("selectedCompareRegion"), summonerName, function (error, result) {
        if(error) {
          if (error.reason.response.statusCode == 404) {
            swal({
              title: "Error",
              text: "Summoner " + summonerName + " not found!",
              type: "error",
              confirmButtonText: "Close"
            });
          } else {
            swal({
              title: "Error",
              text: "To many requests. Please try again later.",
              type: "error",
              confirmButtonText: "Close"
            });
          }
        }else{
          if(result){
            window.location.href = '/summoner/' + region + '/' + summonerId + '/compare/' + result.region + '/' + result.id;
          }
        }
      }
      );
    }
  });

  Template.summoner.helpers({
    stats() {
      if (!Session.get('chestGranted')) {
        return ChampionMastery.find({
          "data.playerId": summonerId,
          region: region
        },{sort:{"data.championPoints": -1}});
      } else {
        return ChampionMastery.find({
          "data.playerId": summonerId,
          'data.chestGranted': Session.get('chestGranted'),
          region: region
        },{sort:{"data.championPoints": -1}});
      }
    },
    summoner(){
      return Summoners.findOne({
        id: summonerId,
        region: region
      });
    },
    regions() {
      return Regions.find();
    },
    selectedRegion() {
      let selectedRegion = Session.get("selectedCompareRegion");
      if(selectedRegion){
        return selectedRegion;
      }else{
        selectedRegion = Session.get("selectedRegion");
        Session.set( "selectedCompareRegion", selectedRegion);
      }
      return selectedRegion;
    },
    canRefreshStats(summoner){
      if(!summoner || !summoner.hasOwnProperty('statsRefreshedAt')){
        return true;
      }else{
        var minutes = moment(new Date()).diff(moment(summoner.statsRefreshedAt), 'minutes');
        return minutes > 60;
      }
    }
  });

  Template.summoner.onDestroyed(function(){
    masteryHandler.stop();
  })
}

