import { Champions } from '../../../imports/api/champion.js';

export default function (Template) {



  Template.home.onCreated(function () {
    Session.set('championSearch', '');
    Tracker.autorun(function () {
      Meteor.subscribe("champions", Session.get('championSearch'));
    });
  });

  Template.home.helpers({
    champions() {
      return Champions.find({},{sort:{name: 1}});
    }
  });

  Template.home.events({
    'keyup #champion-search'(event){
      console.log(event.target.value);
      Session.set('championSearch', event.target.value);
    }
  })

}

