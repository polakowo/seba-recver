(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('WorkExperienceSectionCtrl', WorkExperienceSectionCtrl);

  WorkExperienceSectionCtrl.$inject = ['$state', '$window'];

  function WorkExperienceSectionCtrl($state, $window) {

    var vm = this;

    vm.init = function(section) {
      vm.section = section;
      vm.mEntries = [];

      for (var i = 0; i < vm.section.content.entries.length; i++) {
        vm.mEntries.push({
          entry: vm.section.content.entries[i],
          isFirst: vm.isEntryFirst(i),
          isLast: vm.isEntryLast(i),
          i: i
        });
      }
    };

    vm.updateMEntries = function() {
      for (var i = 0; i < vm.mEntries.length; i++) {
        vm.mEntries[i].isFirst = vm.isMEntryFirst(i);
        vm.mEntries[i].isLast = vm.isMEntryLast(i);
        vm.mEntries[i].i = i;
      }
    };

    vm.addMEntry = function() {
      var newEntry = {
        content: {
          jobTitle: '',
          companyName: '',
          startDate: '',
          endDate: '',
          customInfo: ''
        }
      };
      vm.section.content.entries.push(newEntry);
      var i = vm.section.content.entries.length - 1;
      vm.mEntries.push({
        entry: newEntry,
        isFirst: vm.isEntryFirst(i),
        isLast: vm.isEntryLast(i),
        i: i
      });
      vm.updateMEntries();
    };

    vm.removeMEntry = function(entry) {
      var i = vm.mEntries.indexOf(entry);
      vm.section.content.entries.splice(i, 1);
      vm.mEntries.splice(i, 1);
      vm.updateMEntries();
    };

    vm.moveMEntryUp = function(entry) {
      var i = vm.mEntries.indexOf(entry);
      if (!vm.isMEntryFirst(i)) {
        vm.section.content.entries.splice(i - 1, 0, vm.section.content.entries.splice(i, 1)[0]);
        vm.mEntries.splice(i - 1, 0, vm.mEntries.splice(i, 1)[0]);
      }
      vm.updateMEntries();
    };

    vm.moveMEntryDown = function(entry) {
      var i = vm.mEntries.indexOf(entry);
      if (!vm.isMEntryLast(i)) {
        vm.section.content.entries.splice(i + 1, 0, vm.section.content.entries.splice(i, 1)[0]);
        vm.mEntries.splice(i + 1, 0, vm.mEntries.splice(i, 1)[0]);
      }
      vm.updateMEntries();
    };

    // Called by methods which use existing mEntries
    vm.isMEntryFirst = function(i) {
      return !(i > 0);
    };

    vm.isMEntryLast = function(i) {
      return !(i < vm.mEntries.length - 1);
    };

    // Called by methods which add new mEntries
    vm.isEntryFirst = function(i) {
      return !(i > 0);
    };

    vm.isEntryLast = function(i) {
      return !(i < vm.section.content.entries.length - 1);
    };
  }
}());
