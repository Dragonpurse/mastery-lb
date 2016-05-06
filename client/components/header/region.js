import { Template } from 'meteor/templating';


Template.region.events({
    'click .region'() {
        Session.setPersistent( "selectedRegion", this);
    }
});

