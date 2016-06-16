(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PreviewCVCtrl', PreviewCVCtrl);

  PreviewCVCtrl.$inject = ['$rootScope', '$uibModalInstance', 'cv', '$window', 'FileSaver', 'Blob', '$templateRequest', '$compile', '$timeout'];

  function PreviewCVCtrl($rootScope, $uibModalInstance, cv, $window, FileSaver, Blob, $templateRequest, $compile, $timeout) {

    var vm = this;

    vm.cv = cv;

    vm.templates = [{
      'name': 'Basic template 1',
      'path': '/modules/cvs/client/views/cv-templates/basic1.template.view.html'
    }, {
      'name': 'Basic template 2',
      'path': '/modules/cvs/client/views/cv-templates/basic2.template.view.html'
    }, {
      'name': 'Basic template 3',
      'path': '/modules/cvs/client/views/cv-templates/basic3.template.view.html'
    }];

    vm.active = {
      template: vm.templates[0]
    };

    vm.download = function () {
      $uibModalInstance.close(vm.active.template);
    };

    vm.close = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.composePDF = function(preview) {
      $templateRequest(vm.active.template.path).then(function(template) {
        var scope = $rootScope.$new();
        scope.cv = vm.cv;
        var compiled = $compile(template)(scope);
        $timeout(function() {
          var final = compiled[0].innerHTML;
          var pdf = new jsPDF('p', 'pt', 'a4');
          var specialElementHandlers = {
            '#bypassme': function(element, renderer) {
              return true;
            }
          };
          var margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
          };
          pdf.fromHTML(
            final,
            margins.left,
            margins.top,
            {
              'width': margins.width,
              'elementHandlers': specialElementHandlers,
              'pagesplit': true
            },
            function (dispose) {
              if (preview) {
                var uristring = pdf.output('datauristring');
                angular.element(document.querySelector('#pdfPreview_pdf')).attr('src', uristring);
              } else {
                var blob = pdf.output('blob');
                FileSaver.saveAs(blob, vm.cv.title.replace(/\s/g, '_'));
              }
            },
            margins
          );
        });
      });
    };
  }
}());
