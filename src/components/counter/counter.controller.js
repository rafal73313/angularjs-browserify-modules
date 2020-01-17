require('angular');

var jquery = require('jquery');
var moment = require('moment');
var html2Canvas = require('html2Canvas');

angular.module('wa')
    .controller('waCounterCtrl', ['$scope', 'waCounterService', '$window', function ($scope, waCounterService, $window) {

        $scope.count = 0;
        $scope.date = null;
        $scope.name = null;

        $scope.localTime = null;
        // var stillUtc = moment.utc(date).toDate();

        $scope.increment = function () {
            $scope.count = $scope.count + 1;
            jquery('body').css('background-color', 'red');

            $scope.localTime = moment().local().format('YYYY-MM-DD HH:mm:ss');

            if (!$scope.name) {
                $scope.name = waCounterService.getName();
            }

            console.log('required html2Canvas: ', html2Canvas);
            console.log('$window.html2Canvas: ', $window.html2Canvas);
        }

        $scope.decrement = function () {
            $scope.count = $scope.count - 1;
            jquery('body').css('background-color', 'cyan');
        }

    }])