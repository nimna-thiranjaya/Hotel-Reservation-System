const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_models/hotels");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/hotelAuth");
const multer = require('multer')
//const images = require("../../models/DH_Models/images");
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
router.post("/signup", async (req, res) => {

  
  try {
      const {
        hname,
        details,
        email,
        phone,
        pwd,
        image
      } = req.body;
     
    
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


    // //image upload test
    //   router.post('/upload',(req,res)=>{
    //     upload(req,res,(err)=>{
    //       if(err){
    //         console.log(err)
    //       }
    //       else{
    //         const newImage = new images({
    //           name: req.body.name,
    //           image:{
    //             data:req.file.filename,
    //             contentType: 'image/png'
    //           }
    //         })
    //         newImage
    //         .save()
    //         .then(()=>res.send('successfully uploaded'))
    //         .catch((err)=>console.log(err));
    //       }
    //     })
    //   })



      //hotel profile
      router.get("/profile", auth, async (req, res) => {
        try {
          res.status(201)
          res.send({ success: "hotel fetched", hotel: req.htl});
        } catch (error) {
          res.status(500)
          res.send({ status: "Error with /profile", error: error.message });
        }
      });



      //upload images
      router.post("/upload", auth, async (req, res) => {
        try {
        const hotel1 = await hotel.findById(req.htl._id)

        if (!req.htl) {
          throw new Error("No hotel");
        }

        await hotel.findOneAndUpdate(
          { _id: req.htl._id },
          { $push: { images: req.body } },
          { new: true, upsert: true }
        )
        res.status(200).send({ status: "Image Added" });
        } catch (error) {
          console.log(error.message);
          res.status(500).send({error: error.message});
        }
      });




      //get photos
  router.get("/displayImgs", auth, async (req, res) => {
 
    try {
      const hotl = await hotel.findById(req.htl._id)

      if (!hotl) {
        throw new Error('There is no hotel..!!!')
      }
 
      res.status(200).send({ success: true, images: hotl.images });
    } catch (error) {
      res.status(500).send({ status: "Error with retrieve", error: error.message });
    }
  });



  
      //get photos
      router.get("/displayImg/:id", auth, async (req, res) => {
        const id = req.params.id;
        try {
          const hotl = await hotel.findById(req.htl._id)
    
          if (!hotl) {
            throw new Error('There is no hotel..!!!')
          }
          const images = hotl.images;


          for(var i = 0; i < images.length; i++){
            var im = images[i]
            var x = im._id;

     
            if(id === x.toString()){
              var img = im ;
            }
          }


          // const gg = images.findById(id)
     
          res.status(200).send({ success: true, image: img });
        } catch (error) {
          res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
      });




        //remove Image 
      router.delete("/deleteImg/:id",auth, async (req, res)=>{
          
        try{

          const id = req.params.id;
          const hotl = await hotel.findById(req.htl._id)
          
          const images = hotl.images;


          for(var i = 0; i < images.length; i++){
            var im = images[i]
            var x = im._id;

            console.log(id)
            console.log(x.toString())
            if(id === x.toString()){
              hotel.findOneAndUpdate(
                { _id: req.htl._id },
                { $pull: { images: im } },
                { new: true }
              )
              .then(images => console.log(images))
              .catch(err => console.log(err));
            
            }
          }
          
          res.status(200).send({ success: true, image: im });
        } catch (error) {
          res.status(500).send({ status: "Error with retrieve", error: error.message });
        }
        })









      //add hotel room info
      router.post("/add", auth, async (req, res) => {

        try {
          const user = await hotel.findById(req.htl._id)
          
          if (!user) {
            throw new Error('There is no user')
          }
      
      
          let rooms = {
            productId: productId,
            productName: product.productName,
            productPrice: product.productPrice,
            coverImage: product.coverImage,
          };
      
          await hotel.findOneAndUpdate(
            { _id: req.Cus._id },
            { $push: { rooms: rooms } },
            { new: true, upsert: true }
          )
          res.status(200).send({ status: "Room details Added", room: rooms });
        } catch (error) {
          console.log(error.message);
          res.status(500).send({ error: error.message });
        }
      });



  

  module.exports = router;
