(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('ImageUploaderCtrl', ImageUploaderCtrl);

  ImageUploaderCtrl.$inject = ['$scope', '$state', '$window', '$filter'];

  function ImageUploaderCtrl($scope, $state, $window, $filter) {

    var vm = this;

    vm.init = function() {

    };
  }
}());
