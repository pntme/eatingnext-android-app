(function() {
    'use strict';
    angular.module('xenapp')
            .factory('userValidate', userValidate);

    function userValidate(localStorageService, $ionicViewService, $state, $stateParams, $rootScope, $location) {
        return {
            validUser: function() {
                $rootScope.$on('$stateChangeStart',
                        function(event, toState, toParams, fromState) {
                            
                            var userData = localStorageService.get('userData');
                            if (userData) {
                                 
                                  if(toState.url=="/orders" ){
                                //  $location.path("/orders");
                                // $state.go("orders");    
                                $ionicViewService.nextViewOptions({
                                  disableBack: true
      });

                                }else{
                                    $location.path("/orders");
                                    $state.go("orders");
                                  }
                                
                            } else {
                                   
                                if(toState.url!=="/login"){ 
                                $location.path("/login");
                                $state.go("login");    
                                }else{
                                   $ionicViewService.nextViewOptions({
                                  disableBack: true
      });


                                }                               }
                        })
              

            }
        }
    }

})();