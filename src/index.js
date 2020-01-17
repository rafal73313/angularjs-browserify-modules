(function () {

    var angular = require('angular');

    angular.module('wa', [])

    // load all component .html templates
    require('./dist/componentsTemplatesCache.js');
    // load all components
    require('./components');
})();