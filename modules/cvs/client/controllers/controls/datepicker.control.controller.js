(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('DatepickerPopupCtrl', DatepickerPopupCtrl);

  DatepickerPopupCtrl.$inject = ['$state', '$window'];

  function DatepickerPopupCtrl($state, $window) {

    var vm = this;

    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[0];

    vm.inlineOptions = {
      showWeeks: true
    };

    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    vm.popup1 = {
      opened: false
    };

    vm.popup2 = {
      opened: false
    };

    vm.open1 = function() {
      vm.popup1.opened = true;
    };

    vm.open2 = function() {
      vm.popup2.opened = true;
    };
  }
}());
