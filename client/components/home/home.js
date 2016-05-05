import { Champions } from '../../../imports/api/champion.js';

export default function (Template) {
  Template.home.onCreated(function () {
    Meteor.subscribe('champions');
  });

  Template.home.helpers({
    champions() {
      return Champions.find();
    }
  })

}
