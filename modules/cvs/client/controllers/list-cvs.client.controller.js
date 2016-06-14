(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('ListCVsCtrl', ListCVsCtrl);

  ListCVsCtrl.$inject = ['CVsService'];

  function ListCVsCtrl(CVsService) {

    var vm = this;

    vm.cvs = CVsService.query();
  }
}());
