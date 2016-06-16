(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('TinyMCECtrl', TinyMCECtrl);

  TinyMCECtrl.$inject = ['$state', '$window'];

  function TinyMCECtrl($state, $window) {

    var vm = this;

    // Configure tinymce options
    vm.tinymceOptions = {
      selector: 'textarea#tinymce',
      theme: 'modern',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking',
        'save table contextmenu directionality template paste textcolor'
      ],
      content_css: [
        '/modules/core/client/css/tinymce.css'
      ],
      toolbar: ['insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | preview', 'formatselect fontselect fontsizeselect'],
      file_browser_callback: function(field_name, url, type, win) {
        // configure the file browser callback
      },
      elementpath: false,
      resize: true
    };
  }
}());
