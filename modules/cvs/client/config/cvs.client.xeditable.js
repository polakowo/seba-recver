(function () {
  'use strict';

  angular
    .module('cvs')
    .run(xeditableConfig);

  function xeditableConfig(editableOptions) {
    editableOptions.theme = 'bs3';
  }
}());
