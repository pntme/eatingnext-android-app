(function() {
    'use strict';
    angular.module('xenapp').
            controller('LoginLightCtrl', LoginLightCtrl);
    function LoginLightCtrl($scope, $rootScope, userValidate, loginFactory, storeinfoLocationsIdFactory, localStorageService, $log, $state)
    {
        $log.debug('Login Controller');
        var userData = localStorageService.get('userData');
        userValidate.validUser();
        $scope.login = function() {
            $scope.error="";
            $scope.spinner = true;
            console.log($scope.email);
            var hash = CryptoJS.SHA256($scope.password);
            var stringpassword = hash.toString(CryptoJS.enc.Hex);
            var query = loginFactory.save({email: $scope.email, password: stringpassword});
            query.$promise.then(function(data) {
              
                if (data.data == 'Incorrect email/password') {

                    $scope.error = 'Incorrect email/password';
                     $scope.spinner = false;
                } else {
                    localStorageService.set('userData', {'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                    console.log(data);
                  
                        console.log('fire api');
                            var query = storeinfoLocationsIdFactory.get({}, {
                            'locationid': data.locations[0]
                        });
                        query.$promise.then(function(data) {
                             $scope.spinner = false;
                             
                            console.log(data);
                            localStorageService.set('storeInfo', data);
                            console.log('data is saved in localstorage');
                            
                                $state.go('orders');
                            
                        });
                   
                   
                }
            }).catch(function(err){
               $scope.error = 'Incorrect email/password';
               $scope.spinner = false;
            });

        };
    }
})();