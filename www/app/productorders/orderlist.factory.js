(function() {
    'use strict';
    angular.module('xenapp')
            .factory('orderListFactory', orderListFactory);

    function orderListFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/orders/store/:storeId', {}, {});
    }
    ;
})();