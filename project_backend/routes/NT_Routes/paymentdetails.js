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

module.exports = router;