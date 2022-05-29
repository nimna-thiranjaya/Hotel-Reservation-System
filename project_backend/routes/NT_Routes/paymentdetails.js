const router = require("express").Router();
const booking  = require("../../models/RS_Models/booking")

router.route("/paymetdetails/:id").get((req,res)=>{
    let id = req.params.id;

    booking.findById(id,(err,paymentDetails)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            paymentDetails
        });
    });
})

router.post("/payment/:id",async (req,res) =>{

try{
    let id = req.params.id;
    const payment = await booking.findById(id);

    const status = "Paid"
    
        payment.PaymentStatus = status;
        payment.save();
    
    res.status(200).send({status:"Payment Success"});
}catch(err){
    console.log(err.messege);
    res.status(500).send({error:err.messege});
}


})


module.exports = router;