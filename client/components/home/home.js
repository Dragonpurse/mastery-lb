import { Champions } from '../../../imports/api/champion.js';

export default function (Template) {



  Template.home.onCreated(function () {
    Session.set('championSearch', '');
    Meteor.subscribe("champions");
  });

  Template.home.helpers({
    champions() {
      return Champions.find({
        'name': {$regex: Session.get('championSearch'),  $options: 'i'}
      },{sort:{name: 1}});
    }
  });

  Template.home.events({
    'keyup #champion-search'(event){
      Session.set('championSearch', event.target.value);
    }
  })

}

