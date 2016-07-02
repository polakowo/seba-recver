(function () {
  'use strict';

  angular
    .module('workshops')
    .controller('WorkshopsListController', WorkshopsListController);

  WorkshopsListController.$inject = ['WorkshopsService'];

  function WorkshopsListController(WorkshopsService) {
    var vm = this;

    vm.workshops = WorkshopsService.query();

    /*
     https://www.youtube.com/watch?v=PH3HFEfXQ9Q
     https://www.youtube.com/watch?v=PTbyvLGqTR4
     https://www.youtube.com/watch?v=BV8LJOIMKqo
     https://www.youtube.com/watch?v=_-kySh6jspg
     https://www.youtube.com/watch?v=U0JAfqEak2c
     https://www.youtube.com/watch?v=KxLKPQO3z1I
     https://www.youtube.com/watch?v=M9JmC45VUtc
     https://www.youtube.com/watch?v=mxOli8laZos
     https://www.youtube.com/watch?v=E0D-30ynCBI
     */

    vm.workshops = [{
      'created': Date.now(),
      'type': 'Online course',
      'title': 'Creating CV for dummies',
      'location': 'Munich',
      'video_url': 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q'
    }];
  }
}());
