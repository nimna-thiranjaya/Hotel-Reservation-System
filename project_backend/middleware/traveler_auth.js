const jwt = require("jsonwebtoken");
const config = require("config");
const traveler = require("../models/NT_Models/traveler");


const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const traveler1 = await traveler.findOne({ _id: decode._id, "tokens.token": token });
    if (!traveler1) {
      throw new Error("Please Authenticate");
    }
    req.token = token;
    req.traveler1 = traveler1;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = auth;