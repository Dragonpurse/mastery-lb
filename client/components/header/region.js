import { Template } from 'meteor/templating';


Template.region.events({
    'click .region'() {
        Session.set( "selectedRegion", this);
    }
});

