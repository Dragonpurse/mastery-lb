import { ChampionMastery } from '../../../imports/api/championMastery.js';

export default function (Template) {

    var leaderboardsHandler,
        championHandler;
    Template.leaderboard.onCreated(function () {
        var championId = parseInt(FlowRouter.getParam("championId"));
        Meteor.subscribe('regions');
        leaderboardsHandler = Meteor.subscribe('ChampionLeaderBoards', 'euw' , championId,10,0);
        //To load champion details
        championHandler = Meteor.subscribe('champions', '');

    });

    Template.leaderboard.helpers({
        board() {
            return ChampionMastery.find({},{sort:{"data.championPoints": -1}});
        }
    });

    Template.leaderboard.onDestroyed(function () {
        leaderboardsHandler.stop();
        championHandler.stop();
    });



}
