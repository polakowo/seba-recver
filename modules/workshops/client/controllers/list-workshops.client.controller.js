(function () {
    'use strict';

    angular
        .module('workshops')
        .controller('WorkshopsListController', WorkshopsListController)
        .config(function(uiGmapGoogleMapApiProvider) {
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

        vm.videoClicked = function (str) {
            console.log('Indeed! Clicked!', str);
        };

        vm.output = function (n) {
            console.log(n, typeof n);
        };

        vm.getOverlayStyle = function (index) {
            return {
                'z-index': 1000,
                height: '60px',
                position: 'absolute',
                left: index * 25 + '%'
            };
        };

        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        /*
         https://www.youtube.com/watch?v=PH3HFEfXQ9Q
         https://www.youtube.com/watch?v=PTbyvLGqTR4
         https://www.youtube.com/watch?v=BV8LJOIMKqo

         https://www.youtube.com/watch?v=_-kySh6jspg

         https://www.youtube.com/watch?v=U0JAfqEak2c
         https://www.youtube.com/watch?v=KxLKPQO3z1I
         https://www.youtube.com/watch?v=M9JmC45VUtc
         https://www.youtube.com/watch?v=mxOli8laZos
         https://www.youtube.com/watch?v=E0D-30ynCBI
         */

        vm.currentVideoURL = 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q';

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
            'video_url': 'https://www.youtube.com/watch?v=PH3HFEfXQ9Q'
        }
        ];
    }
}());
