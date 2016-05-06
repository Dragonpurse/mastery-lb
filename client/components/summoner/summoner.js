
import { ChampionMastery } from '../../../imports/api/championMastery.js';
export default function (Template) {



    Template.summoner.onCreated(function () {
        console.log('sub');
        Meteor.subscribe('SummonerChampionMastery', FlowRouter.getParam("region"), FlowRouter.getParam("summonerId"));
    });

    Template.summoner.helpers({
        stats() {
            var stats = ChampionMastery.find();
            console.log(stats);
            return stats;
        }
    })

}

