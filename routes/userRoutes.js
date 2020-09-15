const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const User = require('../models/user');
const Token = require('../models/token')
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const signToken = userID =>{
    return JWT.sign({
        iss: "valamiValaki",
        sub : userID
    }, "valamiValaki", {expiresIn: "1h"});
}


userRouter.post('/register', (req, res) => {
    const {fullname, username, password} = req.body;
    User.findOne({username}, (err, user) => {
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message: {msgBody: "Email adress already registered", msgError: true}});
        else{
            const newUser = new User({fullname, username, password, role: 'user'});
            newUser.save(function (err) {
                if (err) { return res.status(500).json({message :{ msgBody : "Error has occured2", msgError: true }});}
         
                // Create a verification token for this user
                const token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex')});
         
                // Save the verification token
                token.save(function (err) {
                    if (err) { return res.status(500).json({message :{ msgBody : "Error has occured3", msgError: true }}); }
         
                    // Send the email
                    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'richy199898@gmail.com', pass: 'richardo' } });
                    const mailOptions = { from: 'richy199898@gmail.com', to: newUser.username, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user\/confirmation\/' + token.token + '.\n' };
                    transporter.sendMail(mailOptions, err => {
                        if (err) { return res.status(500).json({message:{ msgBody: err.message, msgError: true }}); }
                        res.status(201).json({message: {msgBody: 'A verification email has been sent to ' + newUser.email + '.', msgError: false}});
                    });
                });
            });
        }
    });
});

userRouter.post('/confirmation/:tok', (req, res) =>{
  
   // Find a matching token
   console.log(req.params.tok);
    Token.findOne({ token: req.params.tok }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username,role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {username, role}});
    }
});


userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});


userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});


module.exports = userRouter;