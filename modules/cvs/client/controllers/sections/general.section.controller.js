(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('GeneralSectionCtrl', GeneralSectionCtrl);

  GeneralSectionCtrl.$inject = ['$state', '$window'];

  function GeneralSectionCtrl($state, $window) {

    var vm = this;

    vm.entryContent = {};

    vm.init = function(section) {
      vm.section = section;
      if (section.content.entries.length === 0) {
        section.content.entries.push({
          content: {
            content: ''
          }
        });
      }
      vm.entryContent = section.content.entries[0].content;
    };

  }
}());
