(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PersonalDetailsSectionCtrl', PersonalDetailsSectionCtrl);

  PersonalDetailsSectionCtrl.$inject = ['$state', '$window'];

  function PersonalDetailsSectionCtrl($state, $window) {

    var vm = this;

    vm.init = function(section) {
      vm.section = section;
      vm.entryContent = {};

      if (vm.section.content.entries.length === 0) {
        vm.section.content.entries.push({
          content: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            website: '',
            streetAddress: '',
            postalCode: '',
            city: '',
            country: ''
          }
        });
      }
      vm.entryContent = vm.section.content.entries[0].content;
    };
  }
}());
