export const Champions = new Mongo.Collection('champions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('champions', function (searchQuery) {
        check(searchQuery, String);
        if (searchQuery && searchQuery.length > 1) {
            return Champions.find({
                'name': {$regex: searchQuery,  $options: 'i'}
            });
        }else{
            return Champions.find({});
        }

    });
}
