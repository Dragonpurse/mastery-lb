import { Champions } from '../../../imports/api/champion.js';

export default function (Template) {

  const ddragonUrl = Meteor.settings.public.ddragon;

  Template.home.onCreated(function () {
    Meteor.subscribe('champions');
  });

  Template.home.helpers({
    champions() {
      return Champions.find({},{sort:{name: 1}});
    },
    ddragonUrl(){
      return ddragonUrl;
    }
  })

}

