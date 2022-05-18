const router = require("express").Router();
const stripe = require('stripe')('sk_test_51L05yNKAJVT7fKPgTGnXnUHbGZbAcHfLMago4LxPWm2ZRlv6ZTUMvEYtuhH27vHSkE0rZxXsggzChvd6mXUF0BHk00TTQ6TagP')
const booking  = require("../../models/RS_Models/booking")

router.post('/payment',(req, res) => {
    const {email, name, source, amount, description} = req.body
    stripe.customers.create({
        email :email,
        name:name,
        source: source
    }).then((customer)=>{
        return stripe.charges.create({
            amount:amount*100,
            description:description,
            currency:'LKR',
            customer:customer.id,
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("success")   
    }).catch((err)=>{
        console.log("hello")
        res.send(err)
    })

  });

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