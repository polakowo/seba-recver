(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PreviewCVCtrl', PreviewCVCtrl);

  PreviewCVCtrl.$inject = ['$uibModalInstance', 'cv', '$window'];

  function PreviewCVCtrl($uibModalInstance, cv, $window) {

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

    vm.selected = {
      template: vm.templates[0]
    };

    vm.download = function () {
      $uibModalInstance.close(vm.selected.template);
    };

    vm.close = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.composePDF = function(preview) {
      var pdf = new jsPDF('p', 'pt', 'letter');
      var source = angular.element(document.querySelector('#pdfPreview_html'))[0];
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
        source,
        margins.left,
        margins.top,
        {
          'width': margins.width,
          'elementHandlers': specialElementHandlers
        },
        function (dispose) {
          if (preview) {
            var uristring = pdf.output('datauristring');
            angular.element(document.querySelector('#pdfPreview_pdf')).attr('src', uristring);
          } else {
            pdf.save('sample-file.pdf');
          }
        },
        margins
      );
    };
  }
}());
