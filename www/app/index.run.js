(function() {
    'use strict';
    angular.module('xenapp')
            .run(function( $rootScope,userValidate,fetchOrdersService, $state, localStorageService, $location, $timeout, $interval, pushNotificationService) {
                 userValidate.validUser();
                 fetchOrdersService.newOrders();
                 pushNotificationService.pushInit();
                 
                            // var userData = localStorageService.get('userData');
                            // if (userData) {
                            	
                            // 	$location.path("/orders");
                               
                            // } else {
                            // 	$location.path("/login");
                            //      $state.go("login"); 
                            // }
                       
                // var userData = localStorageService.get("userData");
                // if (angular.isDefined(userData)) {
                //     if(userData.locations.length != 0){
                //     fetchOrdersService.newOrders();
                          
                //     }    
                // }

               
            })
})();