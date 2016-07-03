(function () {
  'use strict';

  angular
    .module('tips')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Tips',
      state: 'tips',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'tips', {
      title: 'List Tips',
      state: 'tips.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'tips', {
      title: 'Create Tip',
      state: 'tips.create',
      roles: ['user']
    });
  }
})();
