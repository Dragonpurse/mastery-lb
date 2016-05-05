export const Regions = new Mongo.Collection('regions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('regions', function tasksPublication() {
        return Regions.find();
    });
}
