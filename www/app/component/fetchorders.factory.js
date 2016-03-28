(function () {
    'use strict';
    angular.module('xenapp')
            .factory('fetchOrdersService', fetchOrdersService);

    function fetchOrdersService(orderListFactory, notification,localStorageService, $rootScope, $interval) {
        var service = {};
        var interval; 
        service.newOrders = function (decide) {

            //console.log(decide)
            if(decide===true){
                $interval.cancel(interval);
                
            }

            var x = 0;
            var y = 0;
            var userData = localStorageService.get("userData");
            if (angular.isDefined(userData)) {
                if (userData.locations.length != 0) {
                    var lid = userData.locations[0];
                    var query = orderListFactory.query({
                        "storeId": lid
                    });
                    query.$promise.then(function (data) {
                      
                        var newOrder = 0;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].order_state == 2 || data[i].order_state == 1) {
                                newOrder++;
                            }
                        }
                        if (newOrder !== 0) {
                            $rootScope.newOrder = newOrder;
                        }
                    });
                    interval= $interval(function () {
                        var array1 = [];
                        var aray2 = [];
                        var userData = localStorageService.get("userData");
                        if (userData) {
                            
                            var lid = userData.locations[0];
                            var query = orderListFactory.query({
                                "storeId": lid
                            });
                            query.$promise.then(function (data) {

                                var newOrder = 0;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].order_state == 2 || data[i].order_state == 1) {
                                        array1.push(data[i]._id);
                                        newOrder++;
                                    }
                                }
                                if (newOrder !== 0) {
                                    $rootScope.newOrder = newOrder;
                                  
                                }
                            });
                        }
                      
                        // }, 180000);  
                    }, 6000);



                }
            }

        };
        return service;
    }
})();