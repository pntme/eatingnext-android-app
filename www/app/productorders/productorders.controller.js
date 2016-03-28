(function () {
    'use strict';

    angular.module('xenapp')
            .controller('productOrdersController', productOrdersController);
    function productOrdersController($scope, userValidate, addOrderFactory, $localStorage, orders, $interval, fetchOrdersService, localStorageService, orderListFactory, $rootScope, $state, orderDetailsFactory, arrayService, pushNotificationService) {
 
        userValidate.validUser();
        var userData = localStorageService.get('userData');
        var eid = userData.eid;
        var lid = userData.locations[0];
        var cid = userData.userid;
        $scope.spinner = true;
        $scope.loadingSpinner = true;
        $scope.hideMainContent = false;
        var orderAm = [];
        var totalAmount;
        onpageLoadApi();
        $scope.doRefresh = function () {
             $scope.spinner = true;
             orders1();
             fetchOrdersService.newOrders(true);
        }
        orders1();
        function onpageLoadApi() {
            var query = orderListFactory.query({"storeId": lid});
            query.$promise.then(function (data) {

                $scope.currencySymbole = arrayService.CurrencySymbol($localStorage.storeInfo.lcurrency);


            });
        }


        $scope.logout = function () {
            localStorageService.removeAll();

            $state.go('login');
        };
        pushNotificationService.pushAPiFromOrder();
        $scope.orderId = function (orderId, order_state) {
            if (order_state == 15 || order_state == 3) {
                localStorageService.set('singleOrderId', orderId);
                 $state.go('details');
            } else {
                var query = orderDetailsFactory.editOrder({"orderId": orderId, "order_state": 3});
                query.$promise.then(function (data) {
                    fetchOrdersService.newOrders(true);


                });
                localStorageService.set('singleOrderId', orderId);
                 $state.go('details');
                  
            }
        };

        var interval = $interval(function () {
            if (!$localStorage.userData)
                $interval.cancel(interval);
            else
                orders1();
            // }, 60000);
        }, 6000);
        function orders1() {
            var query4 = orders.save({
//                "to":new Date().getTime(),
//                 "from":1456165800000       
                "to": new Date().getTime(),
                "from": new Date(moment().startOf('day')).getTime()
            });
            query4.$promise.then(function (data) {
                $scope.loadingSpinner = false;
                $scope.hideMainContent = true;
                //console.log(data);
                $scope.orderList = data.data;
                $scope.spinner = false;
                $rootScope.customerdata = data.data;
            })  .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  
        }
    }
    ;
})();