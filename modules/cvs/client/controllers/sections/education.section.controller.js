(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('EducationSectionCtrl', EducationSectionCtrl);

  EducationSectionCtrl.$inject = ['$state', '$window'];

  function EducationSectionCtrl($state, $window) {

    var vm = this;

    vm.addEntry = function() {
      var newEntry = {
        'content': {
          'courseTitle': '',
          'institutionName': '',
          'startDate': null,
          'endDate': null,
          'otherInfo': ''
        },
        'isFirst': true,
        'isLast': true
      };
      vm.currentSection.content.entries.push(newEntry);
      vm.reorderEntries();
    };

    vm.removeEntry = function(entry) {
      var i = vm.currentSection.content.entries.indexOf(entry);
      vm.currentSection.content.entries.splice(i, 1);
      vm.reorderEntries();
    };

    vm.moveEntryUp = function(entry) {
      var i = vm.currentSection.content.entries.indexOf(entry);
      if (!vm.isEntryFirst(entry)) {
        vm.currentSection.content.entries.splice(i - 1, 0, vm.currentSection.content.entries.splice(i, 1)[0]);
      }
      vm.reorderEntries();
    };

    vm.moveEntryDown = function(entry) {
      var i = vm.currentSection.content.entries.indexOf(entry);
      if (!vm.isEntryLast(entry)) {
        vm.currentSection.content.entries.splice(i + 1, 0, vm.currentSection.content.entries.splice(i, 1)[0]);
      }
      vm.reorderEntries();
    };

    vm.isEntryFirst = function(entry) {
      var i = vm.currentSection.content.entries.indexOf(entry);
      if (i > 0) {
        return false;
      }
      return true;
    };

    vm.isEntryLast = function(entry) {
      var i = vm.currentSection.content.entries.indexOf(entry);
      if (i < vm.currentSection.content.entries.length - 1) {
        return false;
      }
      return true;
    };

    vm.reorderEntries = function() {
      var i;
      var entry;
      for (i = 0; i < vm.currentSection.content.entries.length; i++) {
        entry = vm.currentSection.content.entries[i];
        entry.isFirst = vm.isEntryFirst(entry);
        entry.isLast = vm.isEntryLast(entry);
      }
    };
  }
}());
