const express = require("express");
const router = require("express").Router();
let hotel = require("../../models/DH_models/hotels");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/hotelAuth");


//sign up
router.post("/signup", async (req, res) => {

  
  try {
      const {
        hname,
        details,
        address,
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
        address: address,
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
          if(!(htl.role === "Hotel")){
              throw new Error("You must be a hotel owner!!");
          }
          const token = await htl.generateAuthToken()
          res.status(200).send({token: token, hotel: htl})
    
        } catch (error) {
          res.status(500).send({ error: error.message });
          console.log(error);
        }
    
      })




      //update account details
      router.put('/update', auth, async (req, res) => {
    
        const {
          hname,
          details,
          address,
          email,
          phone,
          image
        } = req.body;
       
        try {
          updateValus = {
            hname: hname,
            details: details,
            address: address,
            phone: phone,
            email: email,
            image: image
          };


      
          const hotelUpdate = await hotel.findByIdAndUpdate(req.htl._id,updateValus)
       
          res.status(200).send({status: 'hotel Profile Updated', hotel1: hotelUpdate})
        } catch (error) {
          res.status(500).send({error: error.message})
          console.log(error)
        }
      })



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
          const hotl = await hotel.findById(req.htl._id);
          const images = hotl.images;

          for(var i = 0; i < images.length; i++){
            var im = images[i];
            var x = im._id;

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
      router.post("/addRoom", auth, async (req, res) => {

        try {
          const htl = await hotel.findById(req.htl._id)
          
          if (!htl) {
            throw new Error('There is no user')
          }

          const {
            type,
            size,
            pricePerNight,
            facilities,
            details
          } = req.body;
      
      
          let rooms = {
            type: type,
            size: size,
            pricePerNight: pricePerNight,
            facilities: facilities,
            details: details
          };
      
          await hotel.findOneAndUpdate(
            { _id: req.htl._id },
            { $push: { rooms: rooms } },
            { new: true, upsert: true }
          )
          res.status(200).send({ status: "Room details Added", rooms: rooms });
        } catch (error) {
          console.log(error.message);
          res.status(500).send({ error: error.message });
        }
      });


            //get rooms
  router.get("/displayRooms", auth, async (req, res) => {
 
    try {
      const hotl = await hotel.findById(req.htl._id)

      if (!hotl) {
        throw new Error('There is no hotel..!!!')
      }
 
      res.status(200).send({ success: true, rooms: hotl.rooms });
    } catch (error) {
      res.status(500).send({ status: "Error with retrieve", error: error.message });
    }
  });



          //get room details
          router.get('/getRoom/:id',auth, async (req, res) => {
    
            const id = req.params.id;
            var htl = await hotel.findById(req.htl._id);
            var rooms = htl.rooms;
           
             try {
              for(var i = 0; i < rooms.length; i++){
                var im = rooms[i];
                var x = im._id;
    
                if(id === x.toString()){
                 var room = im       
                }
              }

               res.status(200).send({status: 'Room Details retrieved', room: room})
            } catch (error) {
              res.status(500).send({error: error.message})
              console.log(error)
            }
          })



        //update room details
        router.put('/roomUpdate/:id',auth, async (req, res) => {
    
          const id = req.params.id;
          var htl = await hotel.findById(req.htl._id);
          var rooms = htl.rooms;
         
           try {
            const {
              type,
              size,
              pricePerNight,
              facilities,
              details
            } = req.body;


            for(var i = 0; i < rooms.length; i++){
              var im = rooms[i];
              var x = im._id;
  
              if(id === x.toString()){
                hotel.findOneAndUpdate(
                  { _id: req.htl._id },
                  { $pull: { rooms: im } },
                  { new: true }
                )
                .then(rooms => console.log(rooms))
                .catch(err => console.log(err));
              
              }
            }

            let room = {
              type: type,
              size: size,
              pricePerNight: pricePerNight,
              facilities: facilities,
              details: details
            };
  
            await hotel.findByIdAndUpdate(
              { _id: req.htl._id},
              { $push: { rooms : room } },
              { new: true, upsert: true },
  
           );

         
             res.status(200).send({status: 'Room Details Updated'})
          } catch (error) {
            res.status(500).send({error: error.message})
            console.log(error)
          }
        })




                //remove room
                router.delete('/roomDelete/:id',auth, async (req, res) => {
    
                  const id = req.params.id;
                  var htl = await hotel.findById(req.htl._id);
                  var rooms = htl.rooms;

                  try {
                    for(var i = 0; i < rooms.length; i++){
                      var im = rooms[i];
                      var x = im._id;
          
                      if(id === x.toString()){
                        hotel.findOneAndUpdate(
                          { _id: req.htl._id },
                          { $pull: { rooms: im } },
                          { new: true }
                        )
                        .then(rooms => console.log(rooms))
                        .catch(err => console.log(err));
                      
                      }
                    }

                 
                     res.status(200).send({status: 'Room removed'})
                  } catch (error) {
                    res.status(500).send({error: error.message})
                    console.log(error)
                  }
                })
        
        




  

  module.exports = router;
