(function () {
  'use strict';

  // Tips controller
  angular
    .module('tips')
    .controller('TipsController', TipsController);

  TipsController.$inject = ['$scope', '$state', 'Authentication', 'tipResolve'];

  function TipsController ($scope, $state, Authentication, tip) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tip = tip;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Tip
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.tip.$remove($state.go('tips.list'));
      }
    }

    // Save Tip
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tipForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.tip._id) {
        vm.tip.$update(successCallback, errorCallback);
      } else {
        vm.tip.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tips.view', {
          tipId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
