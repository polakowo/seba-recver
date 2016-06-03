(function () {
  'use strict';

  angular
    .module('cvs.services')
    .factory('CVsService', CVsService);

  CVsService.$inject = ['$resource'];

  function CVsService($resource) {
    return $resource('api/cvs/:cvId', {
      cvId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
