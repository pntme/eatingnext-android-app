    (function() {
    'use strict';
    angular.module('xenapp')
            .factory('myInterceptor', function(localStorageService) {
                var requestInterceptor = {
                    request: function(config) {
                        ////console.log(config);
                        var currentUser = localStorageService.get('userData');
                        //console.log(currentUser);
                        if (currentUser) {
                            var accessToken = currentUser.token;
                            config.headers['Authorization'] = 'Bearer ' + accessToken;
//                   config.headers = {
//                   'Content-Type': 'application/json',
//                   'Authorization': 'Bearer ' + accessToken
//                 };
                        }
                        return config;
                    }
                };
                return requestInterceptor;
            });
})();