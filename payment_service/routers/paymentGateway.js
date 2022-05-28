const router = require("express").Router();
const stripe = require('stripe')('sk_test_51L05yNKAJVT7fKPgTGnXnUHbGZbAcHfLMago4LxPWm2ZRlv6ZTUMvEYtuhH27vHSkE0rZxXsggzChvd6mXUF0BHk00TTQ6TagP')

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
        res.status(200).send({ status: true, paymentstatus : 'your Paymnet Successfully' });
    }).catch((err)=>{
        res.status(500).send({ status: false, paymentstatus : err });
    })

  });

module.exports = router;