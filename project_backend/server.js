const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(cors());


const URL = process.env.MONGODB_URL;
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

mongoose.connect(URL, {

    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const travelerRouter = require("./routes/NT_Routes/traveler")
const paymentdetailRouter = require("./routes/NT_Routes/paymentdetails")

const connection = mongoose.connection;
connection.once("open", () => {
console.log("Mongodb connection success!!!");
})

app.use("/traveler",travelerRouter);
app.use("/paymentdetails",paymentdetailRouter);

// @import routes
const hotelRouter = require("./routes/DH_routes/hotels");


// rotues
app.use("/hotel",hotelRouter);



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
