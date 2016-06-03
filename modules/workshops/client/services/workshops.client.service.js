(function () {
  'use strict';

  angular
    .module('workshops.services')
    .factory('WorkshopsService', WorkshopsService);

  WorkshopsService.$inject = ['$resource'];

/**
 * Removed:
	{
      update: {
        method: 'PUT'
      }
    }
 */

  function WorkshopsService($resource) {
    return $resource('api/workshops/:workshopId', {
      workshopId: '@_id'
    });
  }
}());
