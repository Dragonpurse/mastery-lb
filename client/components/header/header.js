import constants from '../../../universal/config.js';
import { Regions } from '../../../imports/api/region.js';

export default function (Template) {
  Template.header.onCreated(function () {
    Meteor.subscribe('regions');
  });

  Template.header.helpers({
    regions() {
      return Regions.find();
    }
  })

}
