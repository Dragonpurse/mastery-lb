import { Template } from 'meteor/templating';


console.log('banaan');
Template.region.events({
    'click .region'() {
        Session.set( "selectedRegion", this);
    }
});

