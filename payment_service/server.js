const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8070;
app.use(bodyParser.json());

app.use(cors());

const paymentGateRouter = require("./routers/paymentGateway")
app.use("/paymentGate",paymentGateRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
