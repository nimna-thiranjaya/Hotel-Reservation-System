const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_Models/hotels");
let reservation =require ("../../models/RS_Models/booking");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { request } = require("express");




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


 //get specific Hotel 
 router.get("/hotels/:Id", async (req, res) => {
     const Id= req.params.Id
    try {
         const hotl = await hotel.findById(Id)
      if (!hotl) {
        throw new Error('There is no hotel..!!!')
      }
      res.status(200).send({ success: true, hotel: hotl});

    } catch (error) {

      res.status(500).send({ status: "Error with retrieve", error: error.message });

    }

  });


  //create reservation info
  
  router.post("/reservation/:id1/:id2",  async (req, res) => {
  
      try {
  const id1 = req.params.id1;
  const id2 = req.params.id2;
  const htl = await hotel.findById(id1);

  var rooms = htl.rooms;    
        
              for(var i = 0; i < rooms.length; i++){
                var im = rooms[i];
                var x = im._id;
   
                if(id2 === x.toString()){
                 var room = im      
                }
              }

        const {
            
            CheckinDate,
            CheckoutDate,
            nightsCount
    
        } = req.body;
       
        const amount = room.pricePerNight *nightsCount;
         
   
        const reservation1 = {
          hname: htl.hname,
          type: room.type,
          size: room.size,
          CheckinDate: CheckinDate,
          CheckoutDate: CheckoutDate,
          nightsCount:nightsCount,
          amount:amount
        
        //   travelerId: req.traveler._id
        };
   
        const newreservation = new reservation(reservation1);
        await newreservation.save();

        res
          .status(201)
          .send({ status: "reservation Created", reservation: newreservation });
   
      } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
      }
    });
  
  







module.exports = router;