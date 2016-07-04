(function () {
  'use strict';

  angular
    .module('cvs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'CVs',
      state: 'cvs',
      type: 'dropdown',
      roles: ['*'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cvs', {
      title: 'Manage CVs',
      state: 'cvs.list'
    });
    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'cvs', {
      title: 'Create CV',
      state: 'cvs.create',
      roles: ['user']
    });
  }
}());
