//Tips service used to communicate Tips REST endpoints
(function () {
  'use strict';

  angular
    .module('tips')
    .factory('TipsService', TipsService);

  TipsService.$inject = ['$resource'];

  function TipsService($resource) {
    return $resource('api/tips/:tipId', {
      tipId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
