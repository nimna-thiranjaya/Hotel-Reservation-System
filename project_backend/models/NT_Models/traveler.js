const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const travelerSchema = new mongoose.Schema({
    fname: {
        type : String,
        require:true,
        trim:true
    },

    lname: {
        type : String,
        require:true,
        trim:true
    },

    email:{
        type : String,
        required : true,
        trim : true
    },

    nic: {
        type : String,
        required : true,
        trim:true
    },

    pno: {
        type: String,
        require : true,
        trim:true
    },

    dob : {
        type: String,
        require : true,
        trim :true
    },

    nationality : {
        type: String,
        require : true,
        trim :true
    },

    gender : {
        type: String,
        require : true,
        trim :true
    },

    country: {
        type : String,
        required : true,
        trim: true
    },

    password: {
        type : String,
        required : true,
        trim : true
    },

    imageUrl: {
        type: String,
    },

    tokens: [{
        token: {
        type: String,
        required: true,
        }
    }]

});

//password encryption
travelerSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});

travelerSchema.methods.generateAuthToken = async function () {
    const traveler = this;
    const token = jwt.sign({ _id: traveler._id }, "jwtSecret");
    traveler.tokens = traveler.tokens.concat({ token });
    await traveler.save();
    return token;
};

travelerSchema.statics.findByCredentials = async (email, password) => {
    const traveler1 = await traveler.findOne({ email});
    if (!traveler1) {
      throw new Error("Please enter correct Email");
    }
    const isMatch = await bcrypt.compare(password, traveler1.password);
    if (!isMatch) {
      throw new Error("Password is not matched");
    }
    return traveler1;
  };

const traveler = mongoose.model("traveler",travelerSchema);
module.exports = traveler;