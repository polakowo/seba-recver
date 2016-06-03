(function () {
  'use strict';

  angular
    .module('premium')
    .controller('PremiumController', PremiumController);

  PremiumController.$inject = ['$scope', '$state', 'Authentication'];

  function PremiumController($scope, $state, Authentication, Socket) {
    var vm = this;
  }
}());
