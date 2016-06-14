(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PreviewCVCtrl', PreviewCVCtrl);

  PreviewCVCtrl.$inject = ['$uibModalInstance', 'cv'];

  function PreviewCVCtrl($uibModalInstance, cv) {

    var vm = this;

    vm.templates = ['Basic template 1', 'Basic template 2', 'Basic template 3'];

    vm.selected = {
      template: vm.templates[0]
    };

    vm.download = function () {
      $uibModalInstance.close(vm.selected.template);
    };

    vm.close = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
