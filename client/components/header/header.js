import constants from '../../../universal/config.js';
import { Regions } from '../../../imports/api/region.js';

export default function (Template) {

  const dict = new ReactiveDict('header');

  Template.header.created = function () {
    dict.set('isActive', false);
    dict.set('showLogin', false);
    Meteor.subscribe('regions');
  };

  Template.header.rendered = function () {
    $(document).ready(function() {
      $('ul.dropdown-menu li').click(function(e) {
        $('#region-btn').prop('value', $(this).data('slug'));
      });
    });
  }

  Template['header'].helpers({
    showLogin: () => dict.get('showLogin'),
    isActive: () => dict.get('isActive') ? 'active' : '',
    animateClass: () => dict.get('isActive') ? 'fadeIn' : 'fadeOut',
    iconClass: () => Meteor.user() ? 'user' : 'sign in',
    constant: (what) => constants[what.toLowerCase()]
  });

  Template.header.helpers({
    regions() {
      return Regions.find();
    },
    selectedRegion() {
      return Regions.findOne();
    }
  })

  Template.header.events({
    // 'selectedRegion'(region){
    //   selectedRegion = region;
    // }
  })

}
