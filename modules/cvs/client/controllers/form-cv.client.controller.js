(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('FormCVCtrl', FormCVCtrl);

  FormCVCtrl.$inject = ['$state', 'cvResolve', '$window', '$filter'];

  function FormCVCtrl($state, cv, $window, $filter) {

    var vm = this;

    vm.init = function() {
      vm.cv = cv;

      if (!vm.cv.hasOwnProperty('content')) {
        vm.cv.title = 'My CV ' + $filter('date')(new Date(), 'M/d/yy h:mm a');
        vm.cv.content = {
          sections: [
            {
              name: 'Personal details',
              path: '/modules/cvs/client/views/sections/personal-details.section.view.html',
              content: {
                entries: []
              },
              optional: false,
              movable: false
            }, {
              name: 'Personal profile',
              path: '/modules/cvs/client/views/sections/personal-profile.section.view.html',
              content: {
                entries: []
              },
              optional: true,
              movable: false
            }, {
              name: 'Work experience',
              path: '/modules/cvs/client/views/sections/work-experience.section.view.html',
              content: {
                entries: []
              },
              optional: false,
              movable: true
            }, {
              name: 'Education',
              path: '/modules/cvs/client/views/sections/education.section.view.html',
              content: {
                entries: []
              },
              optional: false,
              movable: true
            }, {
              name: 'Skills',
              path: '/modules/cvs/client/views/sections/general.section.view.html',
              content: {
                entries: []
              },
              optional: true,
              movable: true
            }
          ]
        };
      }

      vm.active = {};
    };
  }
}());
