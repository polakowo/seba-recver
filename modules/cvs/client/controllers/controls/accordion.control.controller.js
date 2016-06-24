(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('AccordionCtrl', AccordionCtrl);

  AccordionCtrl.$inject = [];

  function AccordionCtrl() {

    var vm = this;

    vm.status = {
      open: true,
      closed: false
    };
  }
}());
