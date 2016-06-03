(function () {
  'use strict';

  angular
    .module('premium.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('premium', {
        url: '/premium',
        templateUrl: 'modules/premium/client/views/premium.client.view.html',
        controller: 'PremiumController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Premium'
        }
      });
  }
}());
