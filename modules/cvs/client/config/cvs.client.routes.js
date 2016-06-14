(function () {
  'use strict';

  angular
    .module('cvs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cvs', {
        abstract: true,
        url: '/cvs',
        template: '<ui-view/>'
      })
      .state('cvs.list', {
        url: '',
        templateUrl: 'modules/cvs/client/views/list-cvs.client.view.html',
        controller: 'ListCVsCtrl',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List CVs'
        }
      })
      .state('cvs.create', {
        url: '/create',
        templateUrl: 'modules/cvs/client/views/form-cv.client.view.html',
        controller: 'FormCVCtrl',
        controllerAs: 'vm',
        resolve: {
          cvResolve: newCV
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Create CV'
        }
      })
      .state('cvs.edit', {
        url: '/:cvId/edit',
        templateUrl: 'modules/cvs/client/views/form-cv.client.view.html',
        controller: 'FormCVCtrl',
        controllerAs: 'vm',
        resolve: {
          cvResolve: getCV
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit CV {{ cvResolve.title }}'
        }
      })
      .state('cvs.view', {
        url: '/:cvId',
        templateUrl: 'modules/cvs/client/views/view-cv.client.view.html',
        controller: 'ViewCVCtrl',
        controllerAs: 'vm',
        resolve: {
          cvResolve: getCV
        },
        data: {
          pageTitle: 'CV {{ cvResolve.title }}'
        }
      });
  }

  getCV.$inject = ['$stateParams', 'CVsService'];

  function getCV($stateParams, CVsService) {
    return CVsService.get({
      cvId: $stateParams.cvId
    }).$promise;
  }

  newCV.$inject = ['CVsService'];

  function newCV(CVsService) {
    return new CVsService();
  }
}());
