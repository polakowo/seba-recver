(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PersonalProfileSectionCtrl', PersonalProfileSectionCtrl);

  PersonalProfileSectionCtrl.$inject = ['$state', '$window'];

  function PersonalProfileSectionCtrl($state, $window) {

    var vm = this;

    vm.init = function(section) {
      vm.section = section;
      vm.entryContent = {};

      if (section.content.entries.length === 0) {
        section.content.entries.push({
          content: {
            jobTitle: '',
            customInfo: ''
          }
        });
      }
      vm.entryContent = section.content.entries[0].content;
    };

  }
}());
