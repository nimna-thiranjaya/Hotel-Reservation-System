const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const hotelSchema = new mongoose.Schema({

  hname: {
    type: String,
    required: true,
    trim: true,
  },

  details: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },



  phone: {
    type: String,
    required: true,
    maxlength: 13,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Please enter valid mobile number");
      }
    },
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },

  pwd: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },

  images: [{
    image: {
      type: String,
      required: true,
    },
  }],

  role: {
    type: String,
    default: "Hotel",
  },

  rooms: [{

    type: {
      type: String,
     //require: true
    },
    size: {
      type: String,
      //required: true
    },
    pricePerNight: {
      type: String,
      //required: true
    },
    facilities: {
      type: String,
      //required: false
    },
    details: {
      type: String,
      //required: false
    }
  }],


  tokens: [
    {
      token: {
        type: String,
        //required: true,
      },
    },
  ],

});

// @Action - encrypt the password
hotelSchema.pre('save', async function(next){
  if(!this.isModified("pwd")){
      next();
  }
  const salt = await bcrypt.genSalt(8);
  this.pwd = await bcrypt.hash(this.pwd, salt);
});

// @Action - Get auth token
hotelSchema.methods.generateAuthToken = async function () {
const hotel = this;
const token = jwt.sign({ _id: hotel._id }, "jwtSecret");
hotel.tokens = hotel.tokens.concat({ token });
await hotel.save();
return token;
};

// @Action - Find hotel by credentials
hotelSchema.statics.findByCredentials = async (email, pwd) => {
const hotel1 = await hotel.findOne({ email });
if (!hotel1) {
  throw new Error("Please enter authorized hotel ID");
}
const isMatch = await bcrypt.compare(pwd, hotel1.pwd);
if (!isMatch) {
  throw new Error("Password is not matched");
}
return hotel1;
};

const hotel = mongoose.model("hotels", hotelSchema);

module.exports = hotel;
