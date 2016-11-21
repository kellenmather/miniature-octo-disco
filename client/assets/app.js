"use strict";

var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'partials/users.html',
        controller: 'userController'
    })
    .when('/home',{
        templateUrl: 'partials/home.html',
        controller: 'homeController'
    })
    .when('/addapp',{
      templateUrl: 'partials/app.html',
      controller: 'homeController',
      //controllerAs: 'example'
      //then the partials will have to use as
      //inside controller have to use the actual name
    })
    .otherwise({
        redirectTo: '/'
    });
});
