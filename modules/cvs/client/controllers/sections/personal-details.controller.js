(function () {
  'use strict';

  angular
    .module('cvs')
    .controller('PersonalDetailsSectionCtrl', PersonalDetailsSectionCtrl);

  PersonalDetailsSectionCtrl.$inject = ['$scope', '$state', '$window'];

  function PersonalDetailsSectionCtrl($scope, $state, $window) {

    var vm = this;

    vm.init = function(section) {
      vm.section = section;
      vm.entryContent = {};

      vm.imgNobodySrc = '/modules/cvs/client/img/img-nobody.jpg';

      if (vm.section.content.entries.length === 0) {
        vm.section.content.entries.push({
          content: {
            picture: {
              file: {},
              data: ''
            },
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            website: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: ''
          }
        });
      }
      vm.entryContent = vm.section.content.entries[0].content;

      vm.initImgUploader();
      vm.imgLoaded = vm.entryContent.picture.data.length > 0;
    };

    vm.initImgUploader = function() {
      var imgUploader = document.querySelector('#img-uploader');

      imgUploader.addEventListener('change', function() {
        vm.previewImg();
      });
    };

    vm.previewImg = function() {
      var imgUploader = document.querySelector('#img-uploader');
      var imgFile = imgUploader.files[0];
      var reader = new FileReader();

      reader.onload = function (loadEvent) {
        $scope.$apply(function() {
          vm.entryContent.picture = {};
          vm.entryContent.picture.file = {
            lastModifiedDate: imgFile.lastModifiedDate,
            name: imgFile.name,
            size: imgFile.size,
            type: imgFile.type
          };

          var initImg = loadEvent.target.result;
          vm.resizeImg(initImg, vm.saveImg);
        });
      };
      reader.readAsDataURL(imgFile);
    };

    vm.saveImg = function(dataURL) {
      $scope.$apply(function() {
        vm.entryContent.picture.data = dataURL;

        vm.imgLoaded = true;
      });
    };

    vm.resizeImg = function(initImg, callback) {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var cw = canvas.width;
      var ch = canvas.height;

      var maxW = 150;
      var maxH = 150;

      var img = new Image;

      img.onload = function() {
        var iw = img.width;
        var ih = img.height;

        var scale = Math.min((maxW / iw), (maxH / ih));

        var iwScaled = iw * scale;
        var ihScaled = ih * scale;

        canvas.width = iwScaled;
        canvas.height = ihScaled;

        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);

        callback(canvas.toDataURL());
      };

      img.src = initImg;
    };

    vm.removeImg = function() {
      vm.entryContent.picture = {};

      vm.imgLoaded = false;
    };
  }
}());
