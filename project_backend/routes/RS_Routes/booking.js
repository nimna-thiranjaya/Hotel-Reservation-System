const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_Models/hotels");
let reservation =require ("../../models/RS_Models/booking");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const auth = require("../../middleware/traveler_auth");




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
  
  router.post("/reservation/:id1/:id2",auth, async (req, res) => {

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

        const Date = await reservation.find({CheckinDate:CheckinDate})
        console.log(Date.length)

        if(Date.length > 0){

          throw new Error("You already have reservations on this day!!! ")
        }
       
        const amount = room.pricePerNight *nightsCount;
         
   
        const reservation1 = {
          tvId : req.traveler1._id,
          hname: htl.hname,
          type: room.type,
          size: room.size,
          CheckinDate: CheckinDate,
          CheckoutDate: CheckoutDate,
          nightsCount:nightsCount,
          amount:amount
        
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
  
  

    //get specific traveler reservation info
  
  router.get("/myreservations",auth, async (req, res) => {

    try {
      const reservations = await reservation.find({tvId:req.traveler1._id})

      
      res
        .status(201)
        .send({ status: "reservation retrives", reservations: reservations });
 
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error: error.message});
    }
  });
    

  //get Checkout detailes eith specific id
  
  router.get("/reservations/:id", async (req, res) => {

    try {
      const id = req.params.id;
      const reservation1 = await reservation.findById(id)

      
      res
        .status(201)
        .send({ status: "reservation retrives", reservation: reservation1 });
 
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error: error.message});
    }
  });


  //Delete reservation
router.route('/delete/:id').delete((req,res)=>{
  reservation.findByIdAndRemove(req.params.id).exec((err,deleteAd)=>{
     
      if(err) return res.status(400).json({
          message: "Delete Unsuccessfully",err
      });
     
      return res.json({
          message: "Delete Successfull",deleteAd
      });
  });
});






module.exports = router;