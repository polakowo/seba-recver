(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('ViewCVCtrl', ViewCVCtrl);

  ViewCVCtrl.$inject = ['$state', 'cvResolve', '$window', 'Authentication'];

  function ViewCVCtrl($state, cv, $window, Authentication) {

    var vm = this;

    vm.cv = cv;

    // Remove existing CV
    vm.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    };
  }
}());
