(function() {
    'use strict';
    angular.module('xenapp')
            .config(function($stateProvider, $urlRouterProvider) {
                
                $stateProvider.
                        state('login', {
                            url: '/login',
                            templateUrl: "app/login/login.html",
                            abstract: false,
                            controller: 'LoginLightCtrl'
                        }).
                        state('orders', {
                            url: '/orders',
                            templateUrl: "app/productorders/productorders.html",
                            abstract: false,
                            controller: 'productOrdersController'
                        }).
                         state('details', {
                            url: '/details',
                            templateUrl: "app/orderdetails/orderdetails.html",
                            abstract: false,
                            controller: 'orderDetailsController'
                        });
                     
                $urlRouterProvider.otherwise('/login');
            });
})();