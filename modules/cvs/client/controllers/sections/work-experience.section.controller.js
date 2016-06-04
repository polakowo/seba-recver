(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('WorkExperienceSectionCtrl', WorkExperienceSectionCtrl);

  WorkExperienceSectionCtrl.$inject = ['$scope', '$state', '$window'];

  function WorkExperienceSectionCtrl($scope, $state, $window) {
    // Methods for managing entries inside of a section
    $scope.section = {};
    $scope.section.entries = [];
    $scope.section.addEntry = function() {
      var newEntry = {
        'id': $scope.section.entries.length,
        'jobTitle': '',
        'companyName': '',
        'startDate': new Date(),
        'endDate': new Date(),
        'content': '',
        'isFirst': true,
        'isLast': true
      };
      $scope.section.entries.push(newEntry);
      $scope.section.reorderEntries();
    };
    $scope.section.removeEntry = function(entry) {
      var i = $scope.section.entries.indexOf(entry);
      $scope.section.entries.splice(i, 1);
      $scope.section.reorderEntries();
    };
    $scope.section.moveEntryUp = function(entry) {
      var i = $scope.section.entries.indexOf(entry);
      if (!$scope.section.isEntryFirst(entry)) {
        $scope.section.entries.splice(i - 1, 0, $scope.section.entries.splice(i, 1)[0]);
      }
      $scope.section.reorderEntries();
    };
    $scope.section.moveEntryDown = function(entry) {
      var i = $scope.section.entries.indexOf(entry);
      if (!$scope.section.isEntryLast(entry)) {
        $scope.section.entries.splice(i + 1, 0, $scope.section.entries.splice(i, 1)[0]);
      }
      $scope.section.reorderEntries();
    };
    $scope.section.isEntryFirst = function(entry) {
      var i = $scope.section.entries.indexOf(entry);
      if (i > 0) {
        return false;
      }
      return true;
    };
    $scope.section.isEntryLast = function(entry) {
      var i = $scope.section.entries.indexOf(entry);
      if (i < $scope.section.entries.length - 1) {
        return false;
      }
      return true;
    };
    $scope.section.reorderEntries = function() {
      var i;
      var entry;
      for (i = 0; i < $scope.section.entries.length; i++) {
        entry = $scope.section.entries[i];
        entry.isFirst = $scope.section.isEntryFirst(entry);
        entry.isLast = $scope.section.isEntryLast(entry);
      }
    };
  }
}());
