const express = require('express');
const shoeRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Shoe = require('../models/shoe');
const Token = require('../models/token')
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var fs = require('fs');



shoeRouter.post('/newShoe', passport.authenticate('jwt',{session : false}), (req, res) => {
    if (req.user.role === 'admin'){
        const {code, brand, color, kind, gender, sizes, images, description, price} = req.body;

        
        
        Shoe.findOne({code}, (err, shoe) => {
            if(err)
                res.status(500).json({message: {msgBody : "Error has occured", msgError: true}});
            if(shoe)
                res.status(400).json({message: {msgBody: "There is already a product with this code", msgError: true}});
            else{

                const newShoe = new Shoe({code, brand, color, kind, gender, sizes, images, description, price});
                console.log(newShoe);
                newShoe.save(function (err) {
                    if (err) { return res.status(500).json({message :{ msgBody : "There was a problem saving the product", msgError: true }});} 
                    res.status(200).json({message : {msgBody : "The product was succesfully saved", msgError : false}});
                });
            }
        });
    } else {
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
    }
});


shoeRouter.get('/getShoes', (req, res) => {
    Shoe.find({})
    .then(shoes => res.send(shoes))
    .catch(err => res.status(400).json({message : {msgBody : "There was a problem retrieving the shoes", msgError : true}})); 
});


shoeRouter.post('/deleteShoe', passport.authenticate('jwt',{session : false}), (req, res) => {
    
    if (req.user.role === 'admin'){
        const {code} = req.body;

        Shoe.deleteOne({code}, (err) => {
            if(err)
                res.status(500).json({message: {msgBody : "Error has occured deleting the product", msgError: true}});
            else 
                res.status(200).json({message: {msgBody : "The product was deleted successfully", msgError: false}});
        });
    } else {
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
    }
});

shoeRouter.post('/updateShoe', passport.authenticate('jwt',{session : false}), (req, res) => {
    
    if (req.user.role === 'admin'){
        const {code, brand, color, kind, gender, sizes, description, price, newPrice} = req.body;

        Shoe.updateOne({code}, {code,brand,color,kind,gender,sizes,description,price,newPrice}, (err) => {
            if(err)
                res.status(500).json({message: {msgBody : "Error has occured updating the product", msgError: true}});
            else 
                res.status(200).json({message: {msgBody : "The product was updated successfully", msgError: false}});
        });
    } else {
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
    }
});


module.exports = shoeRouter;