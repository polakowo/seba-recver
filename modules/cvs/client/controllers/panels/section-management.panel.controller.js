(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('SectionManagementCtrl', SectionManagementCtrl);

  SectionManagementCtrl.$inject = ['$state', '$window'];

  function SectionManagementCtrl($state, $window) {

    var vm = this;

    vm.init = function(cv, active) {
      vm.cv = cv;
      vm.active = active;

      vm.setActiveSection(vm.cv.content.sections[0]);
    };

    // Whether certain section is active or not
    vm.isSectionActive = function(section) {
      return vm.cv.content.sections.indexOf(section) === vm.active.i ? 'active' : '';
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

    // Update active section
    vm.updateActiveSection = function() {
      vm.active.isFirst = vm.isSectionFirst(vm.active.i);
      vm.active.isLast = vm.isSectionLast(vm.active.i);
    };

    // Remove active section
    vm.removeActiveSection = function() {
      var i = vm.active.i;
      vm.cv.content.sections.splice(i, 1);
      if (i < vm.cv.content.sections.length) {
        vm.setActiveSection(vm.cv.content.sections[i]);
      } else {
        vm.setActiveSection(vm.cv.content.sections[i - 1]);
      }
    };

    // Move active section
    vm.moveActiveSectionUp = function() {
      var i = vm.active.i;
      if (!vm.active.isFirst) {
        vm.cv.content.sections.splice(i - 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
        --vm.active.i;
      }
      vm.updateActiveSection();
    };

    vm.moveActiveSectionDown = function() {
      var i = vm.active.i;
      if (!vm.active.isLast) {
        vm.cv.content.sections.splice(i + 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
        ++vm.active.i;
      }
      vm.updateActiveSection();
    };
  }
}());
