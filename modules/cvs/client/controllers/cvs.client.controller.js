(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsController', CVsController);

  CVsController.$inject = ['$scope', '$state', 'cvResolve', '$window', 'Authentication'];

  function CVsController($scope, $state, cv, $window, Authentication) {
 
    $scope.cv = cv;
    
    if (!$scope.cv.hasOwnProperty('content')) {
      $scope.cv.title = 'My new CV!'
      $scope.cv.content = {
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
            'isLast': false
          }, {
            'name': 'Personal statement',
            'path': '/modules/cvs/client/views/sections/general.section.view.html',
            'content': {
              content: ''
            },
            'isFirst': false,
            'isLast': false
          }, {
            'name': 'Work experience',
            'path': '/modules/cvs/client/views/sections/work-experience.section.view.html',
            'content': {
              entries: [
                {
                  'jobTitle': '',
                  'companyName': '',
                  'startDate': new Date(),
                  'endDate': new Date(),
                  'otherInfo': '',
                  'isFirst': true,
                  'isLast': true
                }
              ]
            },
            'isFirst': false,
            'isLast': false
          }, {
            'name': 'Education',
            'path': '/modules/cvs/client/views/sections/education.section.view.html',
            'content': {
              entries: [
                {
                  'courseTitle': '',
                  'institutionName': '',
                  'startDate': new Date(),
                  'endDate': new Date(),
                  'otherInfo': '',
                  'isFirst': true,
                  'isLast': true
                }
              ]
            },
            'isFirst': false,
            'isLast': true
          }
        ]
      };
    }
    
    $scope.currentSection = $scope.cv.content.sections[2];

    $scope.setCurrentSection = function(section) {
      $scope.currentSection = section;
    };

    $scope.isSectionActive = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      var j = $scope.cv.content.sections.indexOf($scope.currentSection);
      if (i === j) {
        return 'active';
      }
      return '';
    };

    $scope.addSection = function() {
      if ($scope.newSectionName && $scope.newSectionName !== '') {
        $scope.newSectionName = $scope.newSectionName.charAt(0).toUpperCase() + $scope.newSectionName.slice(1);
        var newSection = {
          'name': $scope.newSectionName,
          'path': '/modules/cvs/client/views/sections/general.section.view.html',
          'content': {
            content: ''
          },
          'isFirst': true,
          'isLast': true
        };
        $scope.cv.content.sections.push(newSection);
        $scope.setCurrentSection(newSection);
        $scope.newSectionName = '';
        $scope.reorderSections();
      }
    };

    $scope.removeSection = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      $scope.cv.content.sections.splice(i, 1);
      if (i < $scope.cv.content.sections.length) {
        $scope.setCurrentSection($scope.cv.content.sections[i]);
      } else {
        $scope.setCurrentSection($scope.cv.content.sections[i - 1]);
      }
      $scope.reorderSections();
    };

    $scope.moveSectionUp = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      if (!$scope.isSectionFirst(section)) {
        $scope.cv.content.sections.splice(i - 1, 0, $scope.cv.content.sections.splice(i, 1)[0]);
      }
      $scope.reorderSections();
    };

    $scope.moveSectionDown = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      if (!$scope.isSectionLast(section)) {
        $scope.cv.content.sections.splice(i + 1, 0, $scope.cv.content.sections.splice(i, 1)[0]);
      }
      $scope.reorderSections();
    };

    $scope.isSectionFirst = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      if (i > 0) {
        return false;
      }
      return true;
    };

    $scope.isSectionLast = function(section) {
      var i = $scope.cv.content.sections.indexOf(section);
      if (i < $scope.cv.content.sections.length - 1) {
        return false;
      }
      return true;
    };

    $scope.reorderSections = function() {
      var i;
      var section;
      for (i = 0; i < $scope.cv.content.sections.length; i++) {
        section = $scope.cv.content.sections[i];
        section.isFirst = $scope.isSectionFirst(section);
        section.isLast = $scope.isSectionLast(section);
      }
    };

    // Remove existing CV
    $scope.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        $scope.cv.$remove($state.go('cvs.list'));
      }
    }

    // Save Article
    $scope.save = function(isValid) {
      if (!isValid) {
        return false;
      }

      // TODO: move create/update logic to service
      if ($scope.cv._id) {
        $scope.cv.$update(successCallback, errorCallback);
      } else {
        $scope.cv.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $window.alert('Your CV was saved successfully!');
      }

      function errorCallback(res) {
        $window.alert('A server error is occurred. Please try again later.');
      }
    }

    $scope.reorderSections();
    // Configure tinymce options
    $scope.tinymceOptions = {
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
  }
}());
