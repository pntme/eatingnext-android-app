(function() {
    'use strict';
    angular.module('xenapp')
            .factory('cancelOrderFactory', cancelOrderFactory);

    function cancelOrderFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cancelorder/:orderId', {
            'orderId': '@orderId'
        }, {});
    }
    ;
})();