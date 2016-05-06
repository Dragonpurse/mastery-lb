
import { ChampionMastery } from '../../../imports/api/championMastery.js';
export default function (Template) {

    var region, summonerId;

    Template.summoner.onCreated(function () {
        region = FlowRouter.getParam("region");
        summonerId = parseInt(FlowRouter.getParam("summonerId"));
        Meteor.subscribe('regions');
        Meteor.subscribe('SummonerChampionMastery', region , summonerId);
    });

    Template.summoner.helpers({
        stats() {
            return ChampionMastery.find({});
        }
    })

}

