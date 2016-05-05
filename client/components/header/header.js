import { Regions } from '../../../imports/api/region.js';
import  './region.js';
export default function (Template) {

  var selectedRegion;

  Template.header.created = function () {
    Meteor.subscribe('regions');
  };



  Template.header.helpers({
    regions() {
      return Regions.find();
    },
    selectedRegion() {
      selectedRegion = Session.get( "selectedRegion" );
      if(selectedRegion){
        return selectedRegion;
      }else{
        selectedRegion = Regions.findOne();
      }
      return selectedRegion;
    }
  });


}
