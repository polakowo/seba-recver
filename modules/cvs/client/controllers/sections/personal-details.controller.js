(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PersonalDetailsSectionCtrl', PersonalDetailsSectionCtrl);

  PersonalDetailsSectionCtrl.$inject = ['$scope', '$state', '$window'];

  function PersonalDetailsSectionCtrl($scope, $state, $window) {
    // Methods for managing entries inside of a section
    if (!$scope.currentSection.content.hasOwnProperty('fullName')) {
      $scope.currentSection.content.fullName = '';
    }
    if (!$scope.currentSection.content.hasOwnProperty('emailAddress')) {
      $scope.currentSection.content.emailAddress = '';
    }
    if (!$scope.currentSection.content.hasOwnProperty('phoneNumber')) {
      $scope.currentSection.content.phoneNumber = '';
    }
    if (!$scope.currentSection.content.hasOwnProperty('website')) {
      $scope.currentSection.content.website = '';
    }
    if (!$scope.currentSection.content.hasOwnProperty('addressLine1')) {
      $scope.currentSection.content.addressLine1 = '';
    }
    if (!$scope.currentSection.content.hasOwnProperty('addressLine2')) {
      $scope.currentSection.content.addressLine2 = '';
    }
  }
}());
