(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsController', CVsController);

  CVsController.$inject = ['$scope', '$state', 'cvResolve', '$window', 'Authentication'];

  function CVsController($scope, $state, cv, $window, Authentication) {

    $scope.sections = [{
      'id': 0,
      'name': 'Personal details',
      'path': '/modules/cvs/client/views/sections/personal-details.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': 1,
      'name': 'Personal statement',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': 2,
      'name': 'Work experience',
      'path': '/modules/cvs/client/views/sections/work-experience.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': 3,
      'name': 'Education',
      'path': '/modules/cvs/client/views/sections/education.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': 4,
      'name': 'Hobbies and interests',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }, {
      'id': 5,
      'name': 'References',
      'path': '/modules/cvs/client/views/sections/general.section.view.html',
      'content': {},
      'isFirst': true,
      'isLast': true
    }];

    $scope.currentSection = $scope.sections[2];

    $scope.setCurrentSection = function(section) {
      $scope.currentSection = section;
    };
    
    $scope.isSectionActive = function(section) {
      if (section.id === $scope.currentSection.id) {
        return 'active';
      }
      return '';
    }
    
    $scope.removeSection = function(section) {
      var i = $scope.sections.indexOf(section);
      $scope.sections.splice(i, 1);
      if (i < $scope.sections.length) {
        $scope.setCurrentSection($scope.sections[i]);
      }
      $scope.reorderSections();
    };
    $scope.moveSectionUp = function(section) {
      var i = $scope.sections.indexOf(section);
      if (!$scope.isSectionFirst(section)) {
        $scope.sections.splice(i - 1, 0, $scope.sections.splice(i, 1)[0]);
      } else {
        
      }
      $scope.reorderSections();
    };
    $scope.moveSectionDown = function(section) {
      var i = $scope.sections.indexOf(section);
      if (!$scope.isSectionLast(section)) {
        $scope.sections.splice(i + 1, 0, $scope.sections.splice(i, 1)[0]);
      }
      $scope.reorderSections();
    };
    $scope.isSectionFirst = function(section) {
      var i = $scope.sections.indexOf(section);
      if (i > 0) {
        return false;
      }
      return true;
    };
    $scope.isSectionLast = function(section) {
      var i = $scope.sections.indexOf(section);
      if (i < $scope.sections.length - 1) {
        return false;
      }
      return true;
    };
    
    $scope.reorderSections = function() {
      var i;
      var section;
      for (i = 0; i < $scope.sections.length; i++) {
        section = $scope.sections[i];
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
