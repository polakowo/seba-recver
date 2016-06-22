(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('GeneralSectionCtrl', GeneralSectionCtrl);

  GeneralSectionCtrl.$inject = ['$state', '$window'];

  function GeneralSectionCtrl($state, $window) {

    var vm = this;

    vm.init = function(section) {
      vm.section = section;
      vm.entryContent = {};

      if (section.content.entries.length === 0) {
        section.content.entries.push({
          content: {
            customInfo: ''
          }
        });
      }
      vm.entryContent = section.content.entries[0].content;
    };

  }
}());
