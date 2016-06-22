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
    }];

    vm.active = {
      template: vm.templates[0]
    };

    vm.isTemplateActive = function(template) {
      return template === vm.active.template ? 'active' : '';
    };

    vm.setActiveTemplate = function(template) {
      vm.active.template = template;
    };

    vm.isCVEmpty = function() {
      var i;

      for (i = 0; i < vm.cv.content.sections.length; i++) {
        if (!vm.isSectionEmpty(vm.cv.content.sections[i])) {
          return false;
        }
      }
      return true;
    };

    vm.isSectionEmpty = function(section) {
      var i;

      for (i = 0; i < section.content.entries.length; i++) {
        if (!vm.isEntryEmpty(section.content.entries[i])) {
          return false;
        }
      }
      return true;
    };

    vm.isEntryEmpty = function(entry) {
      var key;

      for (key in entry.content) {
        if (entry.content.hasOwnProperty(key)) {
          if (typeof entry.content[key] != 'undefined' && entry.content[key] !== '') {
            return false;
          }
        }
      }
      return true;
    };

    vm.isPropertyEmpty = function(property) {
      if (typeof property != 'undefined' && property !== '') {
        return false;
      }
      return true;
    };

    vm.composeTemplate = function() {
      var section,
        entry,
        key,
        j,
        i;
      var template = '';

      if (!vm.isCVEmpty()) {
        template += '<div class="container">';

        // Show full name at first
        for (i = 0; i < vm.cv.content.sections.length; i++) {
          section = vm.cv.content.sections[i];

          if (section.name === 'Personal details') {
            entry = section.content.entries[0];

            if (!vm.isPropertyEmpty(entry.content.fullName)) {
              template = template
                + '<div class="row">'
                + '<div class="col-md-5 col-md-offset-1">'
                + '<h2>' + entry.content.fullName + '</h2>'
                + '</div>'
                + '<div class="col-md-5 col-md-offset-1">'
                + '</div>'
                + '</div>';
            }
          }
        }
        // Show rest information as usual
        for (i = 0; i < vm.cv.content.sections.length; i++) {
          section = vm.cv.content.sections[i];

          if (!vm.isSectionEmpty(section)) {
            switch (section.name) {
              case 'Personal details':
                template = template
                  + '<br>'
                  + '<div class="row">'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '<h3>' + section.name + '</h3>'
                  + '</div>'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '</div>'
                  + '</div>';

                entry = section.content.entries[0];

                template += '<hr>';

                // Address information
                if (!vm.isPropertyEmpty(entry.content.streetAddress)
                  || !vm.isPropertyEmpty(entry.content.postalCode)
                  || !vm.isPropertyEmpty(entry.content.city)
                  || !vm.isPropertyEmpty(entry.content.country)) {
                  var addressString = '';
                  addressString += !vm.isPropertyEmpty(entry.content.streetAddress) ? entry.content.streetAddress + ' ' : '';
                  addressString += !vm.isPropertyEmpty(entry.content.postalCode) ? entry.content.postalCode + ' ' : '';
                  addressString += !vm.isPropertyEmpty(entry.content.city) ? entry.content.city + ' ' : '';
                  addressString += !vm.isPropertyEmpty(entry.content.country) ? entry.content.country : '';

                  template = template
                    + '<div class="row">'
                    + '<div class="col-md-3 col-md-offset-1">'
                    + '<h4>Residence: </h4>'
                    + '</div>'
                    + '<div class="col-md-7 col-md-offset-1">'
                    + '<h4>' + addressString + '</h4>'
                    + '</div>'
                    + '</div>';
                }

                // Phone number
                if (!vm.isPropertyEmpty(entry.content.phoneNumber)) {
                  template = template
                    + '<div class="row">'
                    + '<div class="col-md-3 col-md-offset-1">'
                    + '<h4>Phone number: </h4>'
                    + '</div>'
                    + '<div class="col-md-7 col-md-offset-1">'
                    + '<h4>' + entry.content.phoneNumber + '</h4>'
                    + '</div>'
                    + '</div>';
                }

                // Email address
                if (!vm.isPropertyEmpty(entry.content.emailAddress)) {
                  template = template
                    + '<div class="row">'
                    + '<div class="col-md-3 col-md-offset-1">'
                    + '<h4>Email address: </h4>'
                    + '</div>'
                    + '<div class="col-md-7 col-md-offset-1">'
                    + '<h4><a href="#">' + entry.content.emailAddress + '</a></h4>'
                    + '</div>'
                    + '</div>';
                }

                // Website
                if (!vm.isPropertyEmpty(entry.content.website)) {
                  template = template
                    + '<div class="row">'
                    + '<div class="col-md-3 col-md-offset-1">'
                    + '<h4>Website: </h4>'
                    + '</div>'
                    + '<div class="col-md-7 col-md-offset-1">'
                    + '<h4><a href="#">' + entry.content.website + '</a></h4>'
                    + '</div>'
                    + '</div>';
                }
                break;
              case 'Work experience':
                template = template
                  + '<br>'
                  + '<div class="row">'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '<h3>' + section.name + '</h3>'
                  + '</div>'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '</div>'
                  + '</div>';

                template += '<hr>';

                for (j = 0; j < section.content.entries.length; j++) {
                  entry = section.content.entries[j];

                  if (!vm.isPropertyEmpty(entry.content.startDate)
                    && !vm.isPropertyEmpty(entry.content.endDate)
                    && !vm.isPropertyEmpty(entry.content.jobTitle)) {
                    template = template
                      + '<div class="row">'
                      + '<div class="col-md-3 col-md-offset-1">'
                      + '<h4>' + entry.content.startDate + ' - ' + entry.content.endDate + '</h4>'
                      + '</div>'
                      + '<div class="col-md-7 col-md-offset-1">'
                      + '<h4>' + entry.content.jobTitle;

                    if (!vm.isPropertyEmpty(entry.content.companyName)) {
                      template += ' <span>at ' + entry.content.companyName + '</span>';
                    }

                    template += '</h4>';

                    if (!vm.isPropertyEmpty(entry.content.customInfo)) {
                      template += '<h5>' + entry.content.customInfo + '</h5>';
                    }

                    template = template
                      + '</div>'
                      + '</div>';
                  }
                }
                break;
              case 'Education':
                template = template
                  + '<br>'
                  + '<div class="row">'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '<h3>' + section.name + '</h3>'
                  + '</div>'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '</div>'
                  + '</div>';

                template += '<hr>';

                for (j = 0; j < section.content.entries.length; j++) {
                  entry = section.content.entries[j];

                  if (!vm.isPropertyEmpty(entry.content.startDate)
                    && !vm.isPropertyEmpty(entry.content.endDate)
                    && !vm.isPropertyEmpty(entry.content.courseTitle)) {
                    template = template
                      + '<div class="row">'
                      + '<div class="col-md-3 col-md-offset-1">'
                      + '<h4>' + entry.content.startDate + ' - ' + entry.content.endDate + '</h4>'
                      + '</div>'
                      + '<div class="col-md-7 col-md-offset-1">'
                      + '<h4>' + entry.content.courseTitle;

                    if (!vm.isPropertyEmpty(entry.content.institutionName)) {
                      template += ' <span>at ' + entry.content.institutionName + '</span>';
                    }

                    template += '</h4>';

                    if (!vm.isPropertyEmpty(entry.content.customInfo)) {
                      template += '<h5>' + entry.content.customInfo + '</h5>';
                    }

                    template = template
                      + '</div>'
                      + '</div>';
                  }
                }
                break;
              default:
                template = template
                  + '<br>'
                  + '<div class="row">'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '<h3>' + section.name + '</h3>'
                  + '</div>'
                  + '<div class="col-md-5 col-md-offset-1">'
                  + '</div>'
                  + '</div>';

                entry = section.content.entries[0];

                template += '<hr>';

                if (!vm.isPropertyEmpty(entry.content.customInfo)) {
                  template = template
                    + '<br>'
                    + '<div class="row">'
                    + '<div class="col-md-11 col-md-offset-1">'
                    + '<h5>' + entry.content.customInfo + '</h5>'
                    + '</div>'
                    + '</div>';
                }
                break;
            }
          }
        }

        template += '</div>';
      } else {
        template += '<h3>Your CV is empty. Please add some information about you.</h3>';
      }

      return template;
    };

    vm.templateToDOM = function(template) {
      var section = document.createElement('section');
      section.innerHTML = template;

      return section;
    };

    vm.previewHTML = function() {
      var template = vm.composeTemplate();
      var template_dom = vm.templateToDOM(template);

      var template_frame = document.getElementById('preview');

      if (template_frame.hasChildNodes()) {
        template_frame.removeChild(template_frame.childNodes[0]);
      }

      template_frame.appendChild(template_dom);
    };

    vm.printHTML = function() {
      var template_frame = document.getElementById('preview');

      if (!template_frame.hasChildNodes()) {
        vm.previewHTML();
      }

      var popupWin = window.open('', vm.cv.title, 'width=400,height=600');
      popupWin.document.write('<html>');
      popupWin.document.write('<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></head>');
      popupWin.document.write('<body>' + template_frame.innerHTML + '</body>');
      popupWin.document.write('</html>');
      popupWin.document.close(); // necessary for IE >= 10
      popupWin.focus(); // necessary for IE >= 10
      popupWin.print();
      popupWin.close();
    };

    vm.composePDFFromFile = function(preview) {
      var filePath = '';
      $templateRequest(filePath).then(function(template) {
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
                angular.element(document.querySelector('#preview')).attr('src', uristring);
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

    vm.download = function () {
      $uibModalInstance.close(vm.active.template);
    };

    vm.close = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
