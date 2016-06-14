(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('FormCVCtrl', FormCVCtrl);

  FormCVCtrl.$inject = ['$scope', '$state', 'cvResolve', '$window', 'Authentication', '$uibModal', '$log'];

  function FormCVCtrl($scope, $state, cv, $window, Authentication, $uibModal, $log) {

    var vm = this;

    vm.cv = cv;

    if (!vm.cv.hasOwnProperty('content')) {
      vm.cv.title = 'My new CV!';
      vm.cv.content = {
        sections: [
          {
            'name': 'Personal details',
            'path': '/modules/cvs/client/views/sections/personal-details.section.view.html',
            'content': {
              fullName: '',
              emailAddress: '',
              phoneNumber: '',
              website: '',
              streetAddress: '',
              postalCode: '',
              city: '',
              country: ''
            },
            'isFirst': true,
            'isLast': false,
            'optional': false
          }, {
            'name': 'Work experience',
            'path': '/modules/cvs/client/views/sections/work-experience.section.view.html',
            'content': {
              entries: []
            },
            'isFirst': false,
            'isLast': false,
            'optional': false
          }, {
            'name': 'Education',
            'path': '/modules/cvs/client/views/sections/education.section.view.html',
            'content': {
              entries: []
            },
            'isFirst': false,
            'isLast': true,
            'optional': false
          }
        ]
      };
    }

    vm.currentSection = vm.cv.content.sections[0];

    vm.setCurrentSection = function(section) {
      vm.currentSection = section;
    };

    vm.isSectionActive = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      var j = vm.cv.content.sections.indexOf(vm.currentSection);
      if (i === j) {
        return 'active';
      }
      return '';
    };

    vm.newSectionName = '';

    vm.addSection = function() {
      if (vm.newSectionName && vm.newSectionName !== '') {
        vm.newSectionName = vm.newSectionName.charAt(0).toUpperCase() + vm.newSectionName.slice(1);
        var newSection = {
          'name': vm.newSectionName,
          'path': '/modules/cvs/client/views/sections/general.section.view.html',
          'content': {
            content: ''
          },
          'isFirst': true,
          'isLast': true,
          'optional': true
        };
        vm.cv.content.sections.push(newSection);
        vm.setCurrentSection(newSection);
        vm.newSectionName = '';
      }
    };

    vm.removeSection = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      vm.cv.content.sections.splice(i, 1);
      if (i < vm.cv.content.sections.length) {
        vm.setCurrentSection(vm.cv.content.sections[i]);
      } else {
        vm.setCurrentSection(vm.cv.content.sections[i - 1]);
      }
    };

    vm.moveSectionUp = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      if (!vm.isSectionFirst(section)) {
        vm.cv.content.sections.splice(i - 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
      }
    };

    vm.moveSectionDown = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      if (!vm.isSectionLast(section)) {
        vm.cv.content.sections.splice(i + 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
      }
    };

    vm.isSectionFirst = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      if (i > 0) {
        return false;
      }
      return true;
    };

    vm.isSectionLast = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      if (i < vm.cv.content.sections.length - 1) {
        return false;
      }
      return true;
    };

    vm.reorderSections = function() {
      var i;
      var section;
      for (i = 0; i < vm.cv.content.sections.length; i++) {
        section = vm.cv.content.sections[i];
        section.isFirst = vm.isSectionFirst(section);
        section.isLast = vm.isSectionLast(section);
      }
    };

    $scope.$watch('vm.cv.content.sections', function(newValue, oldValue) {
      vm.reorderSections();
    }, true);

    // Remove existing CV
    vm.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    };

    // Save Article
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
        $window.alert('A server error is occurred. Please try again later.');
      }
    };

    vm.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    };

    vm.reorderSections();
    // Configure tinymce options
    vm.tinymceOptions = {
      selector: 'textarea#tinymce',
      theme: 'modern',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking',
        'save table contextmenu directionality template paste textcolor'
      ],
      content_css: [
        '/modules/core/client/css/tinymce.css'
      ],
      toolbar: ['insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | preview', 'formatselect fontselect fontsizeselect'],
      file_browser_callback: function(field_name, url, type, win) {
        // configure the file browser callback
      },
      elementpath: false,
      resize: true
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

    vm.progress = 0;

    vm.updateProgress = function() {
      var progress = 0.0;

      var section;
      var entry;
      var key;

      var sectionsCount = vm.cv.content.sections.length;
      var entriesCount = 0;
      var keysInSectionCount = 0;
      var keysInEntryCount = 0;

      var progressPerSection = 100.0 / sectionsCount;
      var progressPerItemPerSection = 0.0;
      var progressPerItemPerEntry = 0.0;

      for (var i = 0; i < vm.cv.content.sections.length; i++) {
        section = vm.cv.content.sections[i];

        if (section.content.hasOwnProperty('entries')) {
          entriesCount = section.content.entries.length;
          progressPerItemPerSection = progressPerSection / entriesCount;

          for (var j = 0; j < section.content.entries.length; j++) {
            entry = section.content.entries[j];
            keysInEntryCount = Object.keys(entry.content).length;
            progressPerItemPerEntry = progressPerItemPerSection / keysInEntryCount;

            for (key in entry.content) {
              if (entry.content.hasOwnProperty(key)) {
                if (entry.content[key] && entry.content[key] !== '') {
                  progress = progress + progressPerItemPerEntry;
                }
              }
            }
          }
        } else {
          keysInSectionCount = Object.keys(section.content).length;
          progressPerItemPerSection = progressPerSection / keysInSectionCount;

          for (key in section.content) {
            if (section.content.hasOwnProperty(key)) {
              if (section.content[key] && section.content[key] !== '') {
                progress = progress + progressPerItemPerSection;
              }
            }
          }
        }
        vm.progress = Math.round(progress);
      }
    };

    vm.updateProgress();

    $scope.$watch('vm.cv', function(newValue, oldValue) {
      vm.updateProgress();
    }, true);
  }
}());
