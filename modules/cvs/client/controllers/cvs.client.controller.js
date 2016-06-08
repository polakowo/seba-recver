(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsController', CVsController);

  CVsController.$inject = ['$scope', '$state', 'cvResolve', '$window', 'Authentication'];

  function CVsController($scope, $state, cv, $window, Authentication) {
    $scope.cv = {};
    $scope.currentSectionId = 0;
    $scope.generateSectionId = function() {
      var newSectionId = $scope.currentSectionId;
      $scope.currentSectionId = $scope.currentSectionId + 1;
      return newSectionId;
    };
    $scope.cv.sections = [{
      'id': $scope.generateSectionId(),
      'name': 'Personal details',
      'path': '/modules/cvs/client/views/sections/personal-details.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': $scope.generateSectionId(),
      'name': 'Personal statement',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': $scope.generateSectionId(),
      'name': 'Work experience',
      'path': '/modules/cvs/client/views/sections/work-experience.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': $scope.generateSectionId(),
      'name': 'Education',
      'path': '/modules/cvs/client/views/sections/education.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': $scope.generateSectionId(),
      'name': 'Hobbies and interests',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': $scope.generateSectionId(),
      'name': 'References',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }];
    $scope.currentSection = $scope.cv.sections[2];
    $scope.setCurrentSection = function(section) {
      $scope.currentSection = section;
    };
    $scope.isSectionActive = function(section) {
      if (section.id === $scope.currentSection.id) {
        return 'active';
      }
      return '';
    };
    $scope.addSection = function() {
      if ($scope.newSectionName && $scope.newSectionName !== '') {
        $scope.newSectionName = $scope.newSectionName.charAt(0).toUpperCase() + $scope.newSectionName.slice(1);
        var newSection = {
          'id': $scope.generateSectionId(),
          'name': $scope.newSectionName,
          'path': '/modules/cvs/client/views/sections/general.section.view.html',
          'content': {},
          'isFirst': true,
          'isLast': true
        };
        $scope.cv.sections.push(newSection);
        $scope.setCurrentSection(newSection);
        $scope.newSectionName = '';
        $scope.reorderSections();
      }
    };
    $scope.removeSection = function(section) {
      var i = $scope.cv.sections.indexOf(section);
      $scope.cv.sections.splice(i, 1);
      if (i < $scope.cv.sections.length) {
        $scope.setCurrentSection($scope.cv.sections[i]);
      } else {
        $scope.setCurrentSection($scope.cv.sections[i - 1]);
      }
      $scope.reorderSections();
    };
    $scope.moveSectionUp = function(section) {
      var i = $scope.cv.sections.indexOf(section);
      if (!$scope.isSectionFirst(section)) {
        $scope.cv.sections.splice(i - 1, 0, $scope.cv.sections.splice(i, 1)[0]);
      }
      $scope.reorderSections();
    };
    $scope.moveSectionDown = function(section) {
      var i = $scope.cv.sections.indexOf(section);
      if (!$scope.isSectionLast(section)) {
        $scope.cv.sections.splice(i + 1, 0, $scope.cv.sections.splice(i, 1)[0]);
      }
      $scope.reorderSections();
    };
    $scope.isSectionFirst = function(section) {
      var i = $scope.cv.sections.indexOf(section);
      if (i > 0) {
        return false;
      }
      return true;
    };
    $scope.isSectionLast = function(section) {
      var i = $scope.cv.sections.indexOf(section);
      if (i < $scope.cv.sections.length - 1) {
        return false;
      }
      return true;
    };
    $scope.reorderSections = function() {
      var i;
      var section;
      for (i = 0; i < $scope.cv.sections.length; i++) {
        section = $scope.cv.sections[i];
        section.isFirst = $scope.isSectionFirst(section);
        section.isLast = $scope.isSectionLast(section);
      }
    };
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
