(function () {
    'use strict';

    angular
        .module('workshops')
        .controller('WorkshopsListController', WorkshopsListController)
        .config(function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCfPgzndLgMo_t0A8ikpCbZas4vCW-nHBg', // Generated on 02.07.2016
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'visualization'
            });
        });

    WorkshopsListController.$inject = ['WorkshopsService', '$scope'];

    function WorkshopsListController(WorkshopsService, $scope) {
        var vm = this;

        vm.workshops = WorkshopsService.query();
        vm.workshops = [{
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

        vm.videoClicked = function (index) {
            console.log('Indeed! Clicked!', index, typeof index);
            vm.currentIndex = index;
        };

        vm.prevClicked = function () {
            if (vm.workshops.length > 0) {
                vm.currentIndex--;
                if (vm.currentIndex < 0) {
                    vm.currentIndex = vm.workshops.length - 1;
                }
            }
        };

        vm.nextClicked = function () {
            if (vm.workshops.length > 0) {
                vm.currentIndex++;
                if (vm.currentIndex >= vm.workshops.length) {
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
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

        vm.currentVideoURL = 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q';
    }
}());
