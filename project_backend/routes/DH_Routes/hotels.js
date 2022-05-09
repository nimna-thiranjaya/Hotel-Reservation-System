const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_models/hotels");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/hotelAuth");
const multer = require('multer')
const images = require("../../models/DH_Models/images");
const { application, request } = require("express");



const Storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb) =>{
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage:Storage
});



//sign up
router.post("/signup", upload.single('image'), async (req, res) => {
    console.log(request.file);
  
  try {
      const {
        hname,
        details,
        email,
        phone,
        pwd,
      } = req.body;
      const image = request.file.filename;
    
      let hotel1 = await hotel.findOne({ email });
    if (hotel1) {
      throw new Error("User already exists");
    }


      hotel1 = {
        hname: hname,
        details: details,
        phone: phone,
        email: email,
        pwd: pwd,
        image: image
      };
  
      const newhotel = new hotel(hotel1);
      await newhotel.save();
      const token = await newhotel.generateAuthToken();
      res
        .status(201)
        .send({ status: "hotel Created", hotel: newhotel, token: token });
        console.log(hotel1);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error: error.message});
    }
  });


  
    //login

    router.post('/login', async (req, res) => {
        try {
          const {email, pwd} = req.body
          const htl = await hotel.findByCredentials(email, pwd)
          const token = await htl.generateAuthToken()
          res.status(200).send({token: token, hotel: htl})
    
        } catch (error) {
          res.status(500).send({ error: error.message });
          console.log(error);
        }
    
      })


      router.post('/upload',(req,res)=>{
        upload(req,res,(err)=>{
          if(err){
            console.log(err)
          }
          else{
            const newImage = new images({
              name: req.body.name,
              image:{
                data:req.file.filename,
                contentType: 'image/png'
              }
            })
            newImage
            .save()
            .then(()=>res.send('successfully uploaded'))
            .catch((err)=>console.log(err));
          }
        })
      })


  

  module.exports = router;
