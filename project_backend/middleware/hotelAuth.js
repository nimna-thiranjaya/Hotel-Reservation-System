const jwt = require("jsonwebtoken");
const config = require("config");
const hotel = require("../models/DH_models/hotels");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const htl = await hotel.findOne({ _id: decode._id, "tokens.token": token });
    if (!htl) {
      throw new Error("Please Authenticate");
    }
    req.token = token;
    req.htl = htl;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = auth;