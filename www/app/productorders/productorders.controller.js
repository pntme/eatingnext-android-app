(function () {
    'use strict';

    angular.module('xenapp')
            .controller('productOrdersController', productOrdersController);
    function productOrdersController($scope, userValidate, addOrderFactory, $localStorage, orders, $interval, fetchOrdersService, localStorageService, orderListFactory, $rootScope, $state, orderDetailsFactory, arrayService, pushNotificationService, $ionicHistory) {
 
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
        }
        orders1();
        fetchOrdersService.newOrders();
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
        $scope.orderId = function (orderId, order_state) {
            if (order_state == 15 || order_state == 3) {
                localStorageService.set('singleOrderId', orderId);
                 $state.go('details');
            } else {
                var query = orderDetailsFactory.editOrder({"orderId": orderId, "order_state": 3});
                query.$promise.then(function (data) {
                });
                localStorageService.set('singleOrderId', orderId);
                 $state.go('details');
            }
        };

        $scope.$on('fireOrder1Api', function () {
            orders1();
        });
        function orders1() {
            var query4 = orderListFactory.query({
                "storeId": lid,
                "to": new Date().getTime(),
                "from": new Date(moment().startOf('day')).getTime()
            });
            query4.$promise.then(function (data) {
                var newData = [];
                for(var i = 0; i < data.length; i++){
                    data[i].time = data[i].time.substring(11, 16);
                    newData.push(data[i]);
                }
                $scope.loadingSpinner = false;
                $scope.hideMainContent = true;
                $scope.orderList = newData;
                $scope.spinner = false;
                $rootScope.customerdata = newData;
            })  .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  
        }
    }
    ;
})();