(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsListController', CVsListController);

  CVsListController.$inject = ['$scope', 'CVsService'];

  function CVsListController($scope, CVsService) {
    $scope.cvs = CVsService.query();
  }
}());
