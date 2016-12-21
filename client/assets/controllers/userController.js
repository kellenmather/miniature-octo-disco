"use strict";

app.controller('userController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){
    // var self = this; --this is to avoid scope
    // self.logUser = ''
    // self.errName = ''
    $scope.user = userFactory.getLoginUser();

    $scope.login = function(){
        //if (!self.logUser){
        // self.errName = 'login please'
        // return;
      // }

        userFactory.login($scope.user, function(res){
          //above would be changed to self
            $scope.user = {};
            // console.log(res);
            if(res.err){
                $scope.errMessage = res.err;
                $location.url('/')
            }else{
                   $location.url('/home');
            };
        });
        // };
    };
}]);
