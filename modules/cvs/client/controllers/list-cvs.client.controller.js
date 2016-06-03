(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsListController', CVsListController);

  CVsListController.$inject = ['CVsService'];

  function CVsListController(CVsService) {
    var vm = this;

    vm.cvs = CVsService.query();
  }
}());
