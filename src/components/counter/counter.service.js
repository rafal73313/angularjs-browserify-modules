(function () {

    require('angular');

    angular.module('wa')
        .service('waCounterService', function () {
            var name = 'Jerry';

            this.getName = function () {
                return name;
            }
        })

})();