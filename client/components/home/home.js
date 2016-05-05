import { Champions } from '../../../imports/api/champion.js';
import { Template } from 'meteor/templating';
export default function (Template) {
  Template.home.helpers({

  });

  Template.home.onCreated(function () {
    Meteor.subscribe('champions');
  });

  Template.home.helpers({
    champions() {
      return Champions.find();
    }
  })

}
