(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('DatepickerPopupCtrl', DatepickerPopupCtrl);

  DatepickerPopupCtrl.$inject = ['$scope', '$state', '$window', '$filter'];

  function DatepickerPopupCtrl($scope, $state, $window, $filter) {

    var vm = this;

    vm.startDate = null;
    vm.endDate = null;

    vm.init = function(entry) {
      vm.entry = entry;

      if (typeof vm.entry.content.startDate != 'undefined' && vm.entry.content.startDate !== '') {
        vm.startDate = new Date(vm.entry.content.startDate);
      }
      if (typeof vm.entry.content.endDate != 'undefined' && vm.entry.content.endDate !== '') {
        vm.endDate = new Date(vm.entry.content.endDate);
      }
    };

    vm.convertStartDateToString = function() {
      if (typeof vm.startDate != 'undefined') {
        vm.entry.content.startDate = $filter('date')(vm.startDate, 'yyyy-MM-dd');
      } else {
        vm.entry.content.startDate = '';
      }
    };

    vm.convertEndDateToString = function() {
      if (typeof vm.endDate != 'undefined') {
        vm.entry.content.endDate = $filter('date')(vm.endDate, 'yyyy-MM-dd');
      } else {
        vm.entry.content.endDate = '';
      }
    };

    vm.format = 'yyyy-MM-dd';

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
