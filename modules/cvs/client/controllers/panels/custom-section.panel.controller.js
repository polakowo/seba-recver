(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CustomSectionCtrl', CustomSectionCtrl);

  CustomSectionCtrl.$inject = ['$state', '$window'];

  function CustomSectionCtrl($state, $window) {

    var vm = this;

    vm.init = function(cv, active) {
      vm.cv = cv;
      vm.active = active;
      vm.newSectionName = '';
    };

    // Select section
    vm.isSectionFirst = function(i) {
      return !(i > 0);
    };

    vm.isSectionLast = function(i) {
      return !(i < vm.cv.content.sections.length - 1);
    };

    vm.setActiveSection = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      vm.active.section = section;
      vm.active.isFirst = vm.isSectionFirst(i);
      vm.active.isLast = vm.isSectionLast(i);
      vm.active.i = i;
    };

    vm.addSection = function() {
      if (vm.newSectionName && vm.newSectionName !== '') {
        var sectionsWithTheSameName = vm.cv.content.sections.filter(function(section) { return section.name === vm.newSectionName; });
        if (sectionsWithTheSameName.length > 0) {
          $window.alert('A section with the same name already exists. Please choose another name.');
        } else {
          vm.newSectionName = vm.newSectionName.charAt(0).toUpperCase() + vm.newSectionName.slice(1);
          var newSection = {
            'name': vm.newSectionName,
            'path': '/modules/cvs/client/views/sections/general.section.view.html',
            'content': {
              content: ''
            },
            'optional': true
          };
          vm.cv.content.sections.push(newSection);
          vm.setActiveSection(newSection);
          vm.newSectionName = '';
        }
      }
    };

  }
}());
