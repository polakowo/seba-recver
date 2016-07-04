(function () {
    'use strict';

    angular
        .module('cvs')
        .controller('ViewCVCtrl', ViewCVCtrl);

    ViewCVCtrl.$inject = ['$state', 'cvResolve', '$window', 'Authentication', '$uibModal'];

    function ViewCVCtrl($state, cv, $window, Authentication, $uibModal) {

        var vm = this;

        vm.cv = cv;
        // Duplicate existing CV
        vm.duplicate = function () {
            delete vm.cv._id;
            vm.cv.$save(successCallback, errorCallback);
        };
        // Remove existing CV
        vm.remove = function () {
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

        function successCallback(res) {
            console.log('Duplicated successfully!', res);
            $state.go('cvs.list');
        }

        function errorCallback(res) {
            $window.alert(JSON.stringify(res));
        }
    }
}());
