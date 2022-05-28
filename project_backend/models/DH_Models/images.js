const mongoose = require("mongoose");



const ImageSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    data: Buffer,
    contentType: String
  },

});

const image = mongoose.model("images", ImageSchema);

module.exports = image;
