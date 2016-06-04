(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('CVsController', CVsController);

  CVsController.$inject = ['$scope', '$state', 'cvResolve', '$window', 'Authentication'];

  function CVsController($scope, $state, cv, $window, Authentication) {
    var vm = this;

    vm.cv = cv;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Configure tinymce options
    $scope.tinymceOptions = {
      selector: 'textarea',
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

    // Remove existing CV
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv.$remove($state.go('cvs.list'));
      }
    }

    // Save CV
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cvForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.cv._id) {
        vm.cv.$update(successCallback, errorCallback);
      } else {
        vm.cv.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cvs.view', {
          cvId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
