const mongoose = require("mongoose");
const validator = require("validator");

 
 
const reservationSchema = new mongoose.Schema({
 
    CheckinDate: {
        type: String,
        required: true,
    },
    
    CheckoutDate: {
        type: String,
        required: true,
    },

    nightsCount: {
        type: String,
        required: true,
    },
    hname: {
        type: String,
        required: true,
        trim: true,
      },

    type: {
        type: String,
       //require: true
      },

    size: {
        type: String,
        //required: true
      },

      amount: {
        type: String,
        //required: true
      },


      tvId: {
      type: mongoose.Schema.Types.ObjectId,     
      ref: "traveler"

      }
    
    
});

const reservation = mongoose.model("reservations", reservationSchema);
 
module.exports = reservation;
 