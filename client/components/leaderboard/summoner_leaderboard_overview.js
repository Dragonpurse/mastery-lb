
import { Summoners } from '../../../imports/api/summoner';

export default function (Template) {

    Template.summonerLeaderboardOverview.onCreated(function () {
        Meteor.subscribe('allSummoners');
    });
}