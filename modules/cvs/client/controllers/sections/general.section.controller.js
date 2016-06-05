(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('GeneralSectionCtrl', GeneralSectionCtrl);

  GeneralSectionCtrl.$inject = ['$scope', '$state', '$window'];

  function GeneralSectionCtrl($scope, $state, $window) {
    // Methods for managing entries inside of a section
    if(!$scope.currentSection.content.hasOwnProperty('content')){
      $scope.currentSection.content.content = '';
    }
  }
}());
