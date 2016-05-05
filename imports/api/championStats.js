export const ChampionStats = new Mongo.Collection('championStats');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('championStats', function tasksPublication() {
        return ChampionStats.find();
    });
}


Meteor.methods({
    'stats.findBySummoner'(summonerName) {
        check(summonerName, String);


        /*ChampionStats.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });*/
    }
});