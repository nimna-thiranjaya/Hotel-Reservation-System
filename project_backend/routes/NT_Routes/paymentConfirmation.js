const router = require("express").Router();
const nodemailer = require('nodemailer');

//Sent Payment Confirmation mail
router.post('/sendemail',(req,res)=>{

  const {reciverMail, senderMail,reciverName, reservationid,hotelname,date} = req.body

  var mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nimnathiranjaya523@gmail.com',
        pass: '**********'
      }
  });


  
  let mailDetails = {
    from : senderMail,
    to : reciverMail,
    subject : "Reservation Confirmation Mail",
    text : "Dear"+" "+ reciverName+","+'\r\n'+'\r\n'+"Your reservation is complete and your reservation ID is "+ reservationid +"."+'\r\n'+"Hotel Name : "+hotelname+"."+'\r\n'+"Reservation Date : "+date+"."+'\r\n'+'\r\n'+"Thank You,"+'\r\n'+"Mahinda Rajapaksha Hotel Reservation System",
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      res.status(200).send({ status: false, respMesg: 'Email send error' });
    } else {
      res.status(200).send({ status: true, respMesg: 'Email Sent Successfully' });
    }
  });
  
  });

//Sent Payment Confirmation mail

  module.exports = router;