(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PreviewCVCtrl', PreviewCVCtrl);

  PreviewCVCtrl.$inject = ['$rootScope', '$uibModalInstance', 'cv', '$window', '$filter'];

  function PreviewCVCtrl($rootScope, $uibModalInstance, cv, $window, $filter) {

    var vm = this;

    vm.cv = cv;

    vm.templates = [{
      'name': 'Basic template 1'
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

    vm.composeTemplate = function() {
      var section,
        entry,
        key,
        j,
        i,
        startDate,
        endDate;
      var template = '';

      section = vm.cv.content.sections[0];
      entry = section.content.entries[0];

      // HTML, HEAD & BODY
      template = template
      + '<!DOCTYPE html>'
      + '<html>'
      + '<head>'
      + '<title>' + vm.cv.title + '</title>'
      + '<meta charset="UTF-8">'
      + '<link type="text/css" rel="stylesheet" href="/modules/cvs/client/templates/basic-1/basic-1.template.css">'
      + '<link href="http://fonts.googleapis.com/css?family=Rokkitt:400,700|Lato:400,300" rel="stylesheet" type="text/css">'
      + '<!--[if lt IE 9]>'
      + '<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>'
      + '<![endif]-->'
      + '</head>'
      + '<body id="top">';

      // CV
      template = template
      + '<div id="cv">';

      // MAIN DETAILS
      template = template
      + '<div class="mainDetails">';

      // NAME
      template = template
      + '<div id="name">'
      + '<h1>' + entry.content.fullName + '</h1>';

      if (vm.cv.content.sections[1].name === 'Personal profile') {
        section = vm.cv.content.sections[1];
        entry = section.content.entries[0];

        template = template
        + '<h2>' + entry.content.jobTitle + '</h2>';

        section = vm.cv.content.sections[0];
        entry = section.content.entries[0];
      }

      // CLOSE NAME
      template = template
      + '</div>';

      // CONTACT DETAILS
      template = template
      + '<div id="contactDetails">'
      + '<ul>';

      // Address information
      template = template
      + '<li>Residence:</li>'
      + '<li>' + entry.content.addressLine1 + '</li>'
      + '<li>' + entry.content.addressLine2 + '</li>'
      + '<li>' + entry.content.addressLine3 + '</li>';

      // Phone number
      template = template
      + '<li>Phone number: ' + entry.content.phoneNumber + '</li>';

      // Email
      template = template
      + '<li>Email address: <a href="' + entry.content.emailAddress + '" target="_blank">' + entry.content.emailAddress + '</a></li>';

      // Website
      template = template
      + '<li>Website: <a href="' + entry.content.website + '">' + entry.content.website + '</a></li>';

      // CLOSE CONTACT DETAILS & MAIN DETAILS
      template = template
      + '</ul>'
      + '</div>'
      + '<div class="clear">'
      + '</div>'
      + '</div>';

      // OPEN MAIN AREA
      template = template
      + '<div id="mainArea">';

      // Show rest information as usual
      for (i = 1; i < vm.cv.content.sections.length; i++) {
        section = vm.cv.content.sections[i];

        switch (section.name) {
          case 'Personal profile':
            entry = section.content.entries[0];

            template = template
            + '<section>'
            + '<article>'
            + '<div class="sectionTitle">'
            + '<h2>' + section.name + '</h2>'
            + '</div>'
            + '<div class="sectionContent">'
            + '<p>' + entry.content.customInfo + '</p>'
            + '</div>'
            + '</article>'
            + '<div class="clear">'
            + '</div>'
            + '</section>';
            break;
          case 'Work experience':
            template = template
            + '<section>'
            + '<div class="sectionTitle">'
            + '<h2>' + section.name + '</h2>'
            + '</div>'
            + '<div class="sectionContent">';

            for (j = 0; j < section.content.entries.length; j++) {
              entry = section.content.entries[j];

              startDate = $filter('date')(new Date(entry.content.startDate), 'MMM yyyy');
              endDate = $filter('date')(new Date(entry.content.endDate), 'MMM yyyy');

              template = template
              + '<article>'
              + '<h3>' + entry.content.jobTitle + ' at ' + entry.content.companyName + '</h3>'
              + '<p class="subDetails">' + startDate.toString() + ' - ' + endDate.toString() + '</p>'
              + '<p>' + entry.content.customInfo + '</p>'
              + '</article>';
            }

            template = template
            + '</div>'
            + '<div class="clear">'
            + '</div>'
            + '</section>';
            break;
          case 'Education':
            template = template
            + '<section>'
            + '<div class="sectionTitle">'
            + '<h2>' + section.name + '</h2>'
            + '</div>'
            + '<div class="sectionContent">';

            for (j = 0; j < section.content.entries.length; j++) {
              entry = section.content.entries[j];

              startDate = $filter('date')(new Date(entry.content.startDate), 'MMM yyyy');
              endDate = $filter('date')(new Date(entry.content.endDate), 'MMM yyyy');

              template = template
              + '<article>'
              + '<h3>' + entry.content.courseTitle + ' at ' + entry.content.institutionName + '</h3>'
              + '<p class="subDetails">' + startDate.toString() + ' - ' + endDate.toString() + '</p>'
              + '<p>' + entry.content.customInfo + '</p>'
              + '</article>';
            }

            template = template
            + '</div>'
            + '<div class="clear">'
            + '</div>'
            + '</section>';
            break;
          default:
            entry = section.content.entries[0];

            template = template
            + '<section>'
            + '<div class="sectionTitle">'
            + '<h2>' + section.name + '</h2>'
            + '</div>'
            + '<div class="sectionContent">';

            template = template
            + '<article>'
            + '<p>' + entry.content.customInfo + '</p>'
            + '</article>';

            template = template
            + '</div>'
            + '<div class="clear">'
            + '</div>'
            + '</section>';
            break;
        }
      }

      // CLOSE MAIN AREA
      template = template
      + '</div>';

      // CLOSE CV
      template = template
      + '</div>';

      // CLOSE BODY + HTML
      template = template
      + '</body>';
      + '</html>';

      return template;
    };

    vm.previewHTML = function() {
      var iframe = document.getElementById('preview_iframe');
      var html_template = vm.composeTemplate();

      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      iframeDoc.open();
      iframeDoc.write(html_template);
      iframeDoc.close();
    };

    vm.printHTML = function() {
      var iframe = document.getElementById('preview_iframe');

      vm.previewHTML();

      iframe.contentWindow.onload = function() {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };
    };

    vm.download = function () {
      $uibModalInstance.close(vm.active.template);
    };

    vm.close = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
