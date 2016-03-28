(function() {
    'use strict';
    angular.module('xenapp')
            .factory('notification', notification);

    function notification($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/devices'}, {
            editdevice: {
                method: 'PUT',
                isArray: false,
                url: Configurations.Hostserver + '/devices'
            },
           
        });
    }
    ;
})();