(function() {
    'use strict';
    angular.module('xenapp').
            controller('LoginLightCtrl', LoginLightCtrl);
    function LoginLightCtrl($scope, $rootScope, userValidate, loginFactory, storeinfoLocationsIdFactory, localStorageService, $log, $state, pushNotificationService, $interval, fetchOrdersService)
    {
        $log.debug('Login Controller');
        var userData = localStorageService.get('userData');
        userValidate.validUser();
        $scope.login = function() {
            $scope.error="";
            $scope.spinner = true;
            var userEmail = $scope.email; 
            var hash = CryptoJS.SHA256($scope.password);
            var stringpassword = hash.toString(CryptoJS.enc.Hex);
            var query = loginFactory.save({email: userEmail.toLowerCase(), password: stringpassword});
            query.$promise.then(function(data) {
                    localStorageService.set('userData', {'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                            var query = storeinfoLocationsIdFactory.get({}, {
                            'locationid': data.locations[0]
                        });
                        query.$promise.then(function(data) {
                             $scope.spinner = false;
                            localStorageService.set('storeInfo', data);
                            pushNotificationService.pushAPiFromLogin();
                            var loginInterval = $interval(function () {
                                var userData = localStorageService.get('userData');
                                fetchOrdersService.newOrders();
                                $rootScope.$broadcast('fireOrder1Api');
                                if(!userData){
                                    $interval.cancel(loginInterval);
                                }
                            }, 60000);
                                $state.go('orders'); 
                        });
            }).catch(function(err){
               $scope.error = 'Incorrect email/password';
               $scope.spinner = false;
            });

        };
    }
})();