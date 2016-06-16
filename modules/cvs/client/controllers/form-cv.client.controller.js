(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('FormCVCtrl', FormCVCtrl);

  FormCVCtrl.$inject = ['$state', 'cvResolve', '$window'];

  function FormCVCtrl($state, cv, $window) {

    var vm = this;

    vm.init = function() {
      vm.cv = cv;

      if (!vm.cv.hasOwnProperty('content')) {
        vm.cv.title = 'My new CV!';
        vm.cv.content = {
          sections: [
            {
              name: 'Personal details',
              path: '/modules/cvs/client/views/sections/personal-details.section.view.html',
              content: {
                entries: []
              },
              optional: false
            }, {
              name: 'Work experience',
              path: '/modules/cvs/client/views/sections/work-experience.section.view.html',
              content: {
                entries: []
              },
              optional: false
            }, {
              name: 'Education',
              path: '/modules/cvs/client/views/sections/education.section.view.html',
              content: {
                entries: []
              },
              optional: false
            }
          ]
        };
      }

      vm.active = {};
    };
  }
}());
