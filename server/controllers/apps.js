var mongoose = require('mongoose');
var App = mongoose.model('app');
// get help with the blow MONSTER
function appsController(){
  this.postApp = function(req, res){
    App.find({date: req.body[0].date}, function(error, data) {
      console.log('here I am logging data:', data);
      if(data.length > 2){
        console.log('date.length was great than three??????')
        res.json({err: 'That date is fully booked'})
      }
      else if(data.length > 0){
        console.log('entered else if for loop to check user', data.length)
        for(var i = 0; i < data.length; i++){
          console.log('this is var i', data[i].userId, req.body[1]._id);
          if(data[i].userId == req.body[1]._id){
            console.log('here we will see who the user is', data[i].userID, req.body[1]._id)
            res.json({err: 'You cannot book 2 appointments on the same day'})
          }
        }
        console.log('look here1-------------------', req.body)
        appData = {userId: req.body[1]._id, complaint: req.body[0].complaint, userName: req.body[1].name, time: req.body[0].time, date: req.body[0].date}
        var newApp = new App(appData);
        newApp.save(function(err){
          if(err){
            console.log(err);
            res.json({err: 'Fill out all fields and select a future date'})
          }
          else{
            console.log('message added')
            res.json('message added')
          }
        })
      }
      else{
        console.log('look here2-------------------', req.body)
        appData = {userId: req.body[1]._id, complaint: req.body[0].complaint, userName: req.body[1].name, time: req.body[0].time, date: req.body[0].date}
        var newApp = new App(appData);
        newApp.save(function(err){
          if(err){
            console.log(err);
            res.json({err: err})
          }
          else{
          console.log('message added')
          res.json('message added')
          }
        })
      }
    })
  }

  this.popApp = function(req, res){
    App.find({})
      // .populate('comments')
      .exec(function(err, appointments) {
        if(err) {
          res.json({err: err});
        }
        else{
          res.json(appointments);
        }
      })
  }

  this.cancelApp = function(req, res){
    console.log('This is the id we will remove -- you are in the server controller', req.params.id);
    App.remove({_id: req.params.id}, function(error) {
      if (error) {
        res.json({ error: 'No matching request found' })
      } else {
        App.find({})
        .exec(function(err, appointments) {
          if (err){
            res.json({err: err})
          } else {
            res.json(appointments);
          }
        })
      }
    })
  }

}
module.exports = new appsController();
