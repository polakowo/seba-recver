(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('ViewCVCtrl', ViewCVCtrl);

  ViewCVCtrl.$inject = ['$state', 'cvResolve', '$window', 'Authentication', '$uibModal'];

  function ViewCVCtrl($state, cv, $window, Authentication, $uibModal) {

    var vm = this;

    vm.cv = cv;

    vm.duplicate = function() {
       
      vm.cv.$duplicate($state.go('cvs.list'));
    };
    // Remove existing CV
    vm.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    };

    vm.modalAnimationsEnabled = false;

    vm.openModal = function (size) {
      var modalInstance = $uibModal.open({
        animation: vm.modalAnimationsEnabled,
        templateUrl: 'modules/cvs/client/views/preview-cv.client.view.html',
        controller: 'PreviewCVCtrl',
        controllerAs: 'pcvCtrl',
        size: size,
        resolve: {
          cv: vm.cv
        }
      });
    };

    vm.toggleModalAnimation = function () {
      vm.modalAnimationsEnabled = !vm.modalAnimationsEnabled;
    };
  }
}());
