(function () {
  'use strict';

  angular
    .module('tips')
    .controller('TipsListController', TipsListController);

  TipsListController.$inject = ['TipsService'];

  function TipsListController(TipsService) {
    var vm = this;

    vm.tips = TipsService.query();
  }
})();
