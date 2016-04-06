(function() {
    'use strict';

    angular.module('xenapp')
            .controller('orderDetailsController', orderDetailsController);
    function orderDetailsController($scope, $rootScope, $timeout, orderDetailsFactory, cancelOrderFactory, $state, orderDetailsService, localStorageService, $localStorage, arrayService, $ionicActionSheet) {
        console.log("Order Details Page");
        var singleOrderId = localStorageService.get('singleOrderId');
        if (singleOrderId) {
            $scope.loadingSpinner = true;
            $scope.hideMainContent = false;
            var query = orderDetailsFactory.get({"orderId": singleOrderId});
            query.$promise.then(function(data) {
                if(data.deliverymode == 1){
                    $scope.deliverymode = 'Pickup';
                } else{
                    $scope.deliverymode = 'Delivery';
                }
                $scope.loadingSpinner = false;
                $scope.hideMainContent = true;
                $scope.orderDetails = data.products;
                $scope.orderId = data._id;
                $scope.ordernr = data.ordernr;
                if (data.cfirstname && data.clastname) {
                    $scope.cname = data.cfirstname + " " + data.clastname;
                }
                $scope.cphone = data.cphone;
                $scope.totalAmount = data.subtotal;
                $scope.orderState = data.order_state;
                //$scope.grandTotalAmount = orderDetailsService.grandTotalAmount(data.total, data.deliverymode, data.deliveryrate, data.deliverytax);
                $scope.grandTotalAmount=data.total;
                $scope.vat = data.vat;
                $scope.orderDate = orderDetailsService.orderDate(data.created);
                var storeInfo = localStorageService.get('storeInfo');
                $scope.storeAddress = storeInfo.laddr;
                $scope.storeCountry = storeInfo.lcountry;
                $scope.storeEmail = storeInfo.lemail;
                $scope.storePhone = storeInfo.lphone;
                $scope.storeName = storeInfo.lname;
                $scope.currencySymbole = arrayService.CurrencySymbol($localStorage.storeInfo.lcurrency);
                $scope.clientStreetAddress = data.cstreetaddr;
                $scope.comment = data.comments;
                var time=data.time.substring(11, 16);
                var date=data.time.substring(0, 10);
                $scope.deliverytime = date+" "+"At"+" " +time;
                $scope.deliveryprice = data.deliveryrate;
                $scope.deliverytax = data.deliverytax;                
                if (angular.isDefined($scope.comment)) {
                    $scope.comments = true;
                }
                 if (angular.isDefined($scope.deliveryprice)) {
                    $scope.mode2 = true;
                }
            });
        }else{
            $state.go('dashboard.productOrders');
        }

        $scope.cancelOrderSpinner = false;
        $scope.cancelThisOrder = function() {
            $ionicActionSheet.show({
             buttons: [
               { text: 'Cancel' },
               { text: 'Close' }
             ],
             titleText: 'Order Cancelation',
             buttonClicked: function(index) {
                if(index == 0){
                    $scope.cancelOrderSpinner = true;
                    var query = cancelOrderFactory.get({"orderId": $scope.orderId});
                    query.$promise.then(function(data) {
                        $state.go('orders');
                    });
                }
               return true;
             }
           });
        };
        $scope.backTolist = function() {
            delete $localStorage.singleOrderId;
            $state.go('orders');
        };
       
    }
    ;

})();