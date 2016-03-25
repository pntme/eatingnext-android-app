(function() {
    'use strict';
    angular.module('xenapp')
            .factory('loginFactory', loginFactory);

    function loginFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/token/:email/:password', {}, {});
    }
    ;
})();