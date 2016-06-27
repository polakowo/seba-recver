(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVManagementPanelCtrl', CVManagementPanelCtrl);

  CVManagementPanelCtrl.$inject = ['$scope', '$state', '$window', '$uibModal', 'Authentication'];

  function CVManagementPanelCtrl($scope, $state, $window, $uibModal, Authentication) {

    var vm = this;

    vm.init = function(cv) {
      vm.cv = cv;

      vm.progress = 0;

      vm.progressTypes = ['danger', 'warning', 'primary'];

      $scope.$watch('vm.cv', function(newValue, oldValue) {
        vm.updateProgress();
      }, true);

      vm.modalAnimationsEnabled = false;
    };

    vm.updateProgressType = function() {
      if (vm.progress < 34) {
        vm.progressType = vm.progressTypes[0];
      } else if (vm.progress < 100) {
        vm.progressType = vm.progressTypes[1];
      } else {
        vm.progressType = vm.progressTypes[2];
      }
    };

    // Configure and update progress bar
    vm.updateProgress = function() {
      var progress = 0.0;

      var section;
      var entry;
      var key;

      var sectionsCount = vm.cv.content.sections.length;
      var entriesCount = 0;
      var keysInEntryCount = 0;

      var progressPerSection = 100.0 / sectionsCount;
      var progressPerEntryPerSection = 0.0;
      var progressPerItemPerEntry = 0.0;

      for (var i = 0; i < sectionsCount; i++) {
        section = vm.cv.content.sections[i];
        entriesCount = section.content.entries.length;
        if (entriesCount > 0) {
          progressPerEntryPerSection = progressPerSection / entriesCount;
        } else {
          progressPerEntryPerSection = progressPerSection;
        }

        for (var j = 0; j < entriesCount; j++) {
          entry = section.content.entries[j];
          keysInEntryCount = Object.keys(entry.content).length;

          if (keysInEntryCount > 0) {
            progressPerItemPerEntry = progressPerEntryPerSection / keysInEntryCount;
          } else {
            progressPerItemPerEntry = progressPerEntryPerSection;
          }

          for (key in entry.content) {
            if (entry.content.hasOwnProperty(key)) {
              if (entry.content[key] && entry.content[key] !== '') {
                progress = progress + progressPerItemPerEntry;
              }
            }
          }
        }
      }
      vm.progress = Math.round(progress);
      vm.updateProgressType();
    };

    vm.isCVComplete = function() {
      return vm.progressType === vm.progressTypes[2];
    };

    // Configure and open modal dialog for preview and download
    vm.openModal = function (size) {

      if (vm.isCVComplete()) {
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
      } else {
        $window.alert('Please complete your CV.');
      }
    };

    vm.toggleModalAnimation = function () {
      vm.modalAnimationsEnabled = !vm.modalAnimationsEnabled;
    };

    // Remove existing CV
    vm.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    };

    // Save CV
    vm.save = function() {

      // TODO: move create/update logic to service
      if (vm.cv._id) {
        vm.cv.$update(successCallback, errorCallback);
      } else {
        vm.cv.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $window.alert('Your CV was saved successfully!');
      }

      function errorCallback(res) {
        $window.alert(JSON.stringify(res));
      }
    };
  }
}());
