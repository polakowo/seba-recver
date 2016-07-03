(function () {
  'use strict';

  angular
    .module('tips')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tips', {
        abstract: true,
        url: '/tips',
        template: '<ui-view/>'
      })
      .state('tips.list', {
        url: '',
        templateUrl: 'modules/tips/client/views/list-tips.client.view.html',
        controller: 'TipsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tips List'
        }
      })
      .state('tips.create', {
        url: '/create',
        templateUrl: 'modules/tips/client/views/form-tip.client.view.html',
        controller: 'TipsController',
        controllerAs: 'vm',
        resolve: {
          tipResolve: newTip
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Tips Create'
        }
      })
      .state('tips.edit', {
        url: '/:tipId/edit',
        templateUrl: 'modules/tips/client/views/form-tip.client.view.html',
        controller: 'TipsController',
        controllerAs: 'vm',
        resolve: {
          tipResolve: getTip
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Tip {{ tipResolve.name }}'
        }
      })
      .state('tips.view', {
        url: '/:tipId',
        templateUrl: 'modules/tips/client/views/view-tip.client.view.html',
        controller: 'TipsController',
        controllerAs: 'vm',
        resolve: {
          tipResolve: getTip
        },
        data:{
          pageTitle: 'Tip {{ articleResolve.name }}'
        }
      });
  }

  getTip.$inject = ['$stateParams', 'TipsService'];

  function getTip($stateParams, TipsService) {
    return TipsService.get({
      tipId: $stateParams.tipId
    }).$promise;
  }

  newTip.$inject = ['TipsService'];

  function newTip(TipsService) {
    return new TipsService();
  }
})();
