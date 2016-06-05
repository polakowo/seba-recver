(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('WorkExperienceSectionCtrl', WorkExperienceSectionCtrl);

  WorkExperienceSectionCtrl.$inject = ['$scope', '$state', '$window'];

  function WorkExperienceSectionCtrl($scope, $state, $window) {
    // Methods for managing entries inside of a section
    
    if(!$scope.currentSection.content.hasOwnProperty('entries')){
      $scope.currentSection.content.entries = [];
    }

    $scope.currentSection.content.addEntry = function() {
      var newEntry = {
        'id': $scope.currentSection.content.entries.length,
        'jobTitle': '',
        'companyName': '',
        'startDate': new Date(),
        'endDate': new Date(),
        'otherInfo': '',
        'isFirst': true,
        'isLast': true
      };
      $scope.currentSection.content.entries.push(newEntry);
      $scope.currentSection.content.reorderEntries();
    };
    $scope.currentSection.content.removeEntry = function(entry) {
      var i = $scope.currentSection.content.entries.indexOf(entry);
      $scope.currentSection.content.entries.splice(i, 1);
      $scope.currentSection.content.reorderEntries();
    };
    $scope.currentSection.content.moveEntryUp = function(entry) {
      var i = $scope.currentSection.content.entries.indexOf(entry);
      if (!$scope.currentSection.content.isEntryFirst(entry)) {
        $scope.currentSection.content.entries.splice(i - 1, 0, $scope.currentSection.content.entries.splice(i, 1)[0]);
      }
      $scope.currentSection.content.reorderEntries();
    };
    $scope.currentSection.content.moveEntryDown = function(entry) {
      var i = $scope.currentSection.content.entries.indexOf(entry);
      if (!$scope.currentSection.content.isEntryLast(entry)) {
        $scope.currentSection.content.entries.splice(i + 1, 0, $scope.currentSection.content.entries.splice(i, 1)[0]);
      }
      $scope.currentSection.content.reorderEntries();
    };
    $scope.currentSection.content.isEntryFirst = function(entry) {
      var i = $scope.currentSection.content.entries.indexOf(entry);
      if (i > 0) {
        return false;
      }
      return true;
    };
    $scope.currentSection.content.isEntryLast = function(entry) {
      var i = $scope.currentSection.content.entries.indexOf(entry);
      if (i < $scope.currentSection.content.entries.length - 1) {
        return false;
      }
      return true;
    };
    $scope.currentSection.content.reorderEntries = function() {
      var i;
      var entry;
      for (i = 0; i < $scope.currentSection.content.entries.length; i++) {
        entry = $scope.currentSection.content.entries[i];
        entry.isFirst = $scope.currentSection.content.isEntryFirst(entry);
        entry.isLast = $scope.currentSection.content.isEntryLast(entry);
      }
    };
  }
}());