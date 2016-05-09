export const Champions = new Mongo.Collection('champions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('champions', function () {
        return Champions.find({});
    });
}
