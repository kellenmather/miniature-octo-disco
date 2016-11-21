"use strict";

// console.log('Users Factory');
app.factory('userFactory', ['$http', function($http) {

    var loggedInUser = {};

    function UserFactory(){
        var _this = this;
        var loggedInUser = {};
        this.populateApp = function(callback){
            $http.get('/populateapp').then(function(returned_data){
              if(typeof(callback) == 'function'){
                console.log(returned_data.data)
                callback(returned_data.data)
              }
            })
        }
        this.login = function(user,callback){

            $http.post('/login', user).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    if(returned_data.data){
                        loggedInUser = returned_data.data;
                        // console.log('look here', loggedInUser);
                        callback(returned_data.data);
                    }else{
                        callback(returned_data.data);
                    }
                };
            });
        };
        this.getLoginUser = function(){
            // console.log('does the getloginuser function work?', loggedInUser);
            return loggedInUser;
        };
        this.remove = function(callback) {
            loggedInUser = null;
            callback();
        };
        //BELOW IS APPOINTMENT STUFF
        this.newApp = function(app, user, callback){
          console.log('App reached the Factory');
          $http.post('/enterapp', [app, user]).then(function(returned_data){
            if (typeof(callback) == 'function'){
              console.log('-check is this an error?-', returned_data.data);
              callback(returned_data.data);
            }
          })
        }
        this.cancel = function(id, callback){
          console.log('cancel app begining will be passed to server now...')
          $http.post('/cancelapp/' + id).then(function(returned_data){
            console.log('returned from server with this data:', returned_data)
            callback(returned_data.data);
          })
        }
    };
    // console.log(new UserFactory());
    return new UserFactory();
}]);
