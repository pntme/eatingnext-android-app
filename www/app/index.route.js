(function() {
    'use strict';
    angular.module('xenapp')
            .config(function($stateProvider, $urlRouterProvider) {
                
                $stateProvider.
                        state('login', {
                            url: '/login',
                            cache: false,
                            templateUrl: "app/login/login.html",
                            abstract: false,
                            controller: 'LoginLightCtrl'
                        }).
                        state('orders', {
                            url: '/orders',
                            cache: false,
                            templateUrl: "app/productorders/productorders.html",
                            abstract: false,
                            controller: 'productOrdersController'
                        }).
                         state('details', {
                            url: '/details',
                            cache: false,
                            templateUrl: "app/orderdetails/orderdetails.html",
                            abstract: false,
                            controller: 'orderDetailsController'
                        });
                     
                $urlRouterProvider.otherwise('/login');
            });
})();