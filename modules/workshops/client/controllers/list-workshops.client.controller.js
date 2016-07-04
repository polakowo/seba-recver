(function () {
    'use strict';

    angular
        .module('workshops')
        .controller('WorkshopsListController', WorkshopsListController)
        .config(function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCfPgzndLgMo_t0A8ikpCbZas4vCW-nHBg', // Generated on 02.07.2016
                libraries: 'visualization'
            });
        });

    WorkshopsListController.$inject = ['WorkshopsService', '$scope'];

    function WorkshopsListController(WorkshopsService, $scope) {
        var vm = this;

        // http://www.slideshare.net/tariqhayat/cv-writing-workshop-12606160

        // German CV writing
        // https://www.ctp.org.uk/resettlement-courses/core-workshop/German+CV+writing

        vm.workshops = WorkshopsService.query();

        vm.currentIndex = 0;

        vm.getOnlineCourses = function () {
            return vm.workshops.filter(function (c) {
                return c.type === 'Online course';
            });
        };

        vm.getOnlineCourse = function (index) {
            var courses = vm.getOnlineCourses();
            if (index >= 0 && index < courses.length) {
                return courses[index];
            }
            return courses[courses.length > 0 ? courses.length - 1 : 0];
        };

        vm.videoClicked = function (index) {
            console.log('Indeed! Clicked!', index, typeof index);
            vm.currentIndex = index;
        };

        vm.prevClicked = function () {
            var courses = vm.getOnlineCourses();
            if (courses.length > 0) {
                vm.currentIndex--;
                if (vm.currentIndex < 0) {
                    vm.currentIndex = courses.length - 1;
                }
            }
        };

        vm.nextClicked = function () {
            var courses = vm.getOnlineCourses();
            if (courses.length > 0) {
                vm.currentIndex++;
                if (vm.currentIndex >= courses.length) {
                    vm.currentIndex = 0;
                }
            }
        };

        vm.output = function (n) {
            console.log(n, typeof n);
        };

        vm.getOverlayStyle = function (index) {
            return {
                'z-index': 1000,
                height: '60px'
            };
        };

        // Here's more on how to use it properly: http://angular-ui.github.io/angular-google-maps/#!/use
        vm.map = {center: {latitude: 51.609488, longitude: 10.172388}, zoom: 5};

        vm.currentVideoURL = 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q';
    }
}());
