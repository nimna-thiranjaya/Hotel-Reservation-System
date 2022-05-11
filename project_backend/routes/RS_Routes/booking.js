const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_Models/hotels");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//get Hotels to customer
router.route('/displayhotel').get((req,res) =>{
    hotel.find().exec((err,hotel)=>{
        
        if(err){
            return res.status(400),json({
                error:err
            });
        }
        
        return res.status(200).json({
            success:true,
            existinghotel:hotel
        });
    });
});


module.exports = router;