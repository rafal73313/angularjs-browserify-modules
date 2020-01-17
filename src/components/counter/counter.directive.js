(function () {

    require('angular');

    angular.module('wa')
        .directive('waCounter', function () {
            return {
                controller: 'waCounterCtrl',
                templateUrl: 'src/components/counter/counter.template.html'
            }
        });

})();