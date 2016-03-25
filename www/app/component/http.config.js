(function() {
    'use strict';
    angular.module('xenapp')
            .config(function($httpProvider) {
                $httpProvider.interceptors.push('myInterceptor');
            });
})();