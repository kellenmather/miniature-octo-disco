"use strict";

app.controller('homeController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){
    $scope.user = userFactory.getLoginUser();
    $scope.appointment = {};
    $scope.getApps;
    // var populateApp = function(){
    userFactory.populateApp(function(data){
        $scope.getApps = data;
        console.log('here is the return data', $scope.getApps);
    });
    // }

    // $scope.getMessages;
    // userFactory.populateMessage(function(data){
    //     $scope.getMessages = data;
    //     });

    // console.log($scope.getMessages);
    // userFactory.Message($scope.messagePost, function(res){
    //   $scope.messageBoard = {}
    // });

    $scope.logout = function() {
        userFactory.remove(function() {
            $location.url('/');
        });
    };

    //this is to populate only future dates in our list
    $scope.validDate = function(date) {
      return new Date() < new Date(date);
    }

    $scope.cancel = function (appId){
        userFactory.cancel(appId, function(res) {
            console.log('made it back home controller?', res);
            $scope.getApps = res;
        })
    }

    $scope.newapp = function() {
        console.log('begin add appointment');
        userFactory.newApp($scope.appointment, $scope.user, function(res){
            console.log('important', res);
            if(res.err){
                console.log('treated as err', res.err);
                $scope.errMessage = res.err;
            }
            else{
                console.log('didnt treat as error');
                $scope.appointment = {}
                console.log('done adding appointment!');
                $location.url('/home');
            };
        });
    };
}]);
