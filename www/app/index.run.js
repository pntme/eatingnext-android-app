(function() {
    'use strict';
    angular.module('xenapp')
            .run(function( $rootScope,userValidate,fetchOrdersService, $state, localStorageService, $location, $timeout, $interval, pushNotificationService) {
                 userValidate.validUser();
                 var userData = localStorageService.get("userData");
                 if(userData){
                    pushNotificationService.pushAPiFromRun();
                    fetchOrdersService.newOrders();
                    var runInterval = $interval(function () {
                        fetchOrdersService.newOrders();
                        $rootScope.$broadcast('fireOrder1Api');
                        if(!userData){
                            $interval.cancel(runInterval);
                        }
                    }, 60000);
                 }
                 pushNotificationService.pushInit();
            })
})();