const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy
const User = require('../../db/models').User;
const Message = require('../../db/models').Message;
const Chatroom = require('../../db/models').Chatroom;
const Team = require('../../db/models').Team;

//FUNCTION//

const createSession = (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      },
      attributes: {exclude: ['createdAt', 'updatedAt']}
   })
  .then((user) => {
    //IF user exists, check if password is correct
    if(user && user.password === req.body.password) {
      console.log('Password is correct!')
      return user;
    //ELSE IF user does not exist, create new user
    } else if(!user) {
      console.log('User does not exist!');
    } else {
      return null;
    }
  })
  .then((user) => {
    if(user) {
      return Promise.all([user.getTeams({attributes: ["name",'id'], joinTableAttributes: []}), user.getChatrooms({attributes: ["name",'id'], joinTableAttributes: []}), user])
    } else {
      res.send('Incorrect password or username!');
    }
  })
  .spread((teams, chatrooms, user) => {
    res.send({teams, chatrooms, user})
  })
};

const authenticate = (req,res)=>{
  if(req.session.user) {
    console.log('check session', req.session)
    res.send(req.session.user);
  } else {
    res.send(null);
  }
};

const destroySession = (req,res) => {
  if(req.session.user){
    req.session.destroy()
    console.log('logged out')
  }
}

//ROUTES//
router.route('/')
	.post(createSession)
	.get(authenticate)
	.delete(destroySession)

module.exports = router;

