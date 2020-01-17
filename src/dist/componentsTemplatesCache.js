(function(module) {
try {
  module = angular.module('wa');
} catch (e) {
  module = angular.module('wa', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/components/counter/counter.template.html',
    '<div>\n' +
    '    <h2>Counter {{ count }}</h2>\n' +
    '    <h2>Name is: {{ name || \'missing!\' }}</h2>\n' +
    '    <h3 ng-if="localTime">{{ localTime }}</h3>\n' +
    '    <div>\n' +
    '        <button ng-click="increment()">increment</button>\n' +
    '        <button ng-click="decrement()">decrement</button>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('wa');
} catch (e) {
  module = angular.module('wa', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/components/app/app.template.html',
    '<div>\n' +
    '    <h2>Welcome, this is App directive</h2>\n' +
    '    <hr />\n' +
    '    <wa-counter ng-if="showCounter"></wa-counter>\n' +
    '    <hr />\n' +
    '    <button ng-click="toggleCounter()">turn off directive with jquery</button>\n' +
    '    <button ng-click="turnBackgroundCyan()">turn background cyan with jquery</button>\n' +
    '</div>');
}]);
})();
