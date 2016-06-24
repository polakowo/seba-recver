(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('SectionManagementPanelCtrl', SectionManagementPanelCtrl);

  SectionManagementPanelCtrl.$inject = ['$state', '$window'];

  function SectionManagementPanelCtrl($state, $window) {

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
    vm.isUpAllowed = function(i) {
      if (vm.cv.content.sections[i].movable) {
        if (i > 0) {
          if (vm.cv.content.sections[i - 1].movable) {
            return true;
          }
        }
      }
      return false;
    };

    vm.isDownAllowed = function(i) {
      if (vm.cv.content.sections[i].movable) {
        if (i < vm.cv.content.sections.length - 1) {
          if (vm.cv.content.sections[i + 1].movable) {
            return true;
          }
        }
      }
      return false;
    };

    vm.setActiveSection = function(section) {
      var i = vm.cv.content.sections.indexOf(section);
      vm.active.section = section;
      vm.active.isUpAllowed = vm.isUpAllowed(i);
      vm.active.isDownAllowed = vm.isDownAllowed(i);
      vm.active.i = i;
    };

    // Update active section
    vm.updateActiveSection = function() {
      vm.active.isUpAllowed = vm.isUpAllowed(vm.active.i);
      vm.active.isDownAllowed = vm.isDownAllowed(vm.active.i);
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
      if (vm.active.isUpAllowed) {
        vm.cv.content.sections.splice(i - 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
        --vm.active.i;
      }
      vm.updateActiveSection();
    };

    vm.moveActiveSectionDown = function() {
      var i = vm.active.i;
      if (vm.active.isDownAllowed) {
        vm.cv.content.sections.splice(i + 1, 0, vm.cv.content.sections.splice(i, 1)[0]);
        ++vm.active.i;
      }
      vm.updateActiveSection();
    };
  }
}());
