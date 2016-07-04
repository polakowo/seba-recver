(function () {
    'use strict';

    angular
        .module('tips')
        .controller('TipsListController', TipsListController)
        .filter("sanitize", ['$sce', function ($sce) {
            return function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            }
        }]);
    ;

    TipsListController.$inject = ['TipsService', '$scope', '$sce'];

    function TipsListController(TipsService, $scope, $sce) {
        var vm = this;

        vm.tips = TipsService.query();

        //vm.testHtml = $sce.trustAsHtml('<b>Oh yeah!</b>');
        $scope.$watchCollection('vm.tips', function(newValue, oldValue) {
            newValue.map(function (tip) {
                tip.content = $sce.trustAsHtml(tip.content);
            });
        });
    }
})();
