const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use(cors());

const emailConfirmRouter = require("./routes/paymentConfirmation")
app.use("/emailConf",emailConfirmRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
