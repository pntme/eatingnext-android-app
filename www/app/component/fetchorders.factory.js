(function () {
    'use strict';
    angular.module('xenapp')
            .factory('fetchOrdersService', fetchOrdersService);

    function fetchOrdersService(orderListFactory, notification,localStorageService, $rootScope) {
        var service = {};
        service.newOrders = function () {
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
                                    console.log('sound is playing');
                                    $rootScope.newOrder = newOrder;
                                    var my_media = new Media("/android_asset/www/app/lib/notify.wav");
                                    my_media.play();
                                }
                                if(newOrder == 0){
                                    $rootScope.newOrder = null;
                                }
                            });
                        } 
                }
            }
        };
        return service;
    }
})();