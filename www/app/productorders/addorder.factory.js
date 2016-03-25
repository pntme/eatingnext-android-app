(function() {
    'use strict';
    angular.module('xenapp')
            .factory('addOrderFactory', addOrderFactory);

    function addOrderFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/orders/:eid/:lid/:cid/:cphone/:ccountrycode/:products/:smsverified/:paid/:pickuptime', {}, {});
    }
    ;
})();