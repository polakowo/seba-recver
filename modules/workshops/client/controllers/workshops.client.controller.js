(function () {
  'use strict';

  angular
    .module('workshops')
    .controller('WorkshopsController', WorkshopsController);

  WorkshopsController.$inject = ['$scope', '$state', 'workshopResolve', '$window', 'Authentication'];

  function WorkshopsController($scope, $state, workshop, $window, Authentication) {
    var vm = this;

    vm.workshop = workshop;
    vm.authentication = Authentication;
    vm.error = null;
  }
}());
