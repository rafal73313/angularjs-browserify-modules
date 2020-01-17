(function () {

    require('angular');

    angular.module('wa')
        .directive('waApp', ['$window', function ($window) {
        return {
            templateUrl: 'src/components/app/app.template.html',
            link: function (scope, el, attr) {
                scope.title = 'Hello World!';
                scope.showCounter = true;

                scope.toggleCounter = function () {
                    scope.showCounter = !scope.showCounter;
                }

                scope.turnBackgroundCyan = function () {
                    console.log('$window: ', $window);
                    console.log('$window.$: ', $window.$);
                    console.log('$window.jquery: ', $window.jquery);
                    console.log('$window.jQuery: ', $window.jQuery);
                }

                console.log('aaa');
            }
        }
    }]);

})();