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
        vm.workshops = [{
            'created': Date.now(),
            'type': 'Workshop',
            'title': 'German CV writing',
            'location': 'Munich',
            'url': 'https://www.ctp.org.uk/resettlement-courses/core-workshop/German+CV+writing'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=PTbyvLGqTR4'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=BV8LJOIMKqo'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=_-kySh6jspg'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=U0JAfqEak2c'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=KxLKPQO3z1I'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=M9JmC45VUtc'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=mxOli8laZos'
        }, {
            'created': Date.now(),
            'type': 'Online course',
            'title': 'Creating CV for dummies',
            'location': 'Munich',
            'video_url': 'https://www.youtube.com/watch?v=E0D-30ynCBI'
        }];

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
        vm.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

        vm.markers = [{
            id: 0,
            coords: {
                latitude: 45,
                longitude: -73
            },
            options: {draggable: true}
            // events: {
            //     dragend: function (marker, eventName, args) {
            //         $log.log('marker dragend');
            //         var lat = marker.getPosition().lat();
            //         var lon = marker.getPosition().lng();
            //         $log.log(lat);
            //         $log.log(lon);
            //
            //         $scope.marker.options = {
            //             draggable: true,
            //             labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            //             labelAnchor: "100 0",
            //             labelClass: "marker-labels"
            //         };
            //     }
            // }
        }];

        vm.currentVideoURL = 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q';
    }
}());
