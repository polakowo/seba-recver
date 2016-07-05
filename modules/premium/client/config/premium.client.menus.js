(function () {
  'use strict';

  angular
    .module('premium')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];
/*
  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Premium',
      state: 'premium',
      roles: ['*'],
      position: 3
    });
  }*/
}());
