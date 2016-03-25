(function() {
    'use strict';
    angular.module('xenapp')
            .factory('orders', orders);

    function orders($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/orders', {}, {});
    }
    ;
})();

//return $resource(Configurations.Hostserver + '/orders/store/:storeId', {storeId:'@storeId'}, {});