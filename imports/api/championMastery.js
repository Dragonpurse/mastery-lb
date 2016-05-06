export const ChampionMastery = new Mongo.Collection('championMastery');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('SummonerChampionMastery', function (region, summonerId) {
        check(region, String);
        check(summonerId, Number);
        return ChampionMastery.find({
            "data.playerId": summonerId,
            region: region
        });

    });

    Meteor.publish('ChampionLeaderBoards', function (region, championId) {
        check(region, String);
        check(championId, Number);
        return ChampionMastery.find({
            "data.championId": championId,
            region: region
        });
    });
}


Meteor.methods({
    'updateSummonerStats'(region, summonerId) {
        check(region, String);
        check(summonerId, Number);


        /*ChampionStats.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });*/
    }
});