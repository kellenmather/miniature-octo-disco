"use strict"

console.log('users controller');

  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  // var session = require('express-session');

function UsersController(){

  this.login = function(req,res){
    User.findOne({name: req.body.name}, function(err, user){
      console.log('-------------------NOTE HERE:', user)
      if(user < 1) { //if the name is NOT found do this:
        console.log('name not found');
        var newUser = new User(req.body);
        console.log(newUser);
        newUser.save(function(err){
          if(err) {
            res.json({err: 'Enter your name'});
          }
          else{
            res.json({user: {name: User.name, id: User._id, timestamps: User.timestamps}});
            console.log(user);
          }
        })
      }
      else{ //if the name IS found do this:
        console.log('name was found', user);
        res.json(user);
      };
    });
  };
};
module.exports = new UsersController();
