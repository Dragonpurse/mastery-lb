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
      selectedRegion = Session.get("selectedRegion");
      if(selectedRegion){
        return selectedRegion;
      }else{
        selectedRegion = Regions.findOne();
        Session.setPersistent( "selectedRegion", selectedRegion);
      }
      return selectedRegion;
    }
  });

  Template.header.events({
    'submit .summoner-search'(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const target = event.target;
      const summonerName = target.summonerName.value;

      Meteor.call('summoner.search', selectedRegion, summonerName, function (error, result) {
        console.log(result);
          if(error){
            swal({   title: "Error",   text: "Summoner " + summonerName + " not found!",   type: "error",   confirmButtonText: "Close" });
          }else{
            window.location.href = '/summoner/' + result.region + '/' + result.id;

          }
        }
      );
    }
  });


}
