const router = require("express").Router();
const auth = require("../../middleware/traveler_auth")
const traveler = require("../../models/NT_Models/traveler")

//Add Traveler
router.post('/register', async (req, res)=>{
    try{
        const {fname, lname, email, nic, pno, dob, nationality, gender, country, password, imageUrl} = req.body

        let traveler1 = await traveler.findOne({email})
        
        if(traveler1){
            throw new Error("Account Already Exists using this email")
        }

        traveler1 = {
            fname : fname,
            lname : lname,
            email : email,
            nic : nic,
            pno : pno,
            dob : dob,
            nationality : nationality,
            gender : gender,
            country : country,
            password : password,
            imageUrl : imageUrl
        }

        const newtraveler = new traveler(traveler1)
        await newtraveler.save()
        const token = await newtraveler.generateAuthToken()
        res.status(200).send({traveler: newtraveler, token: token, status: 'Traveler account creation successful'})
    }catch(error){
        res.status(500).send({error: error.message})
        console.log(error)
    }
})

//Traveler Loging   
router.post('/login', async (req, res) => {
    try {
      const {email,password} = req.body
      const traveler1 = await traveler.findByCredentials(email, password)

      if(traveler1){
        const token = await traveler1.generateAuthToken()
        res.status(200).send({token: token, traveler1: traveler1, message : "login success"})
      }else{
        throw new Error('Invalid Credentials')
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
      console.log(error);
    }
  });

//Traveler profile
router.get("/profile", auth, async (req, res) => {
    try {
      res.status(201)
      res.send({ success: "User fetched", traveler1: req.traveler1});
    } catch (error) {
      res.status(500)
      res.send({ status: "Error with profile", error: error.message });
    }
  });

router.put('/update', auth, async (req, res) => {
    
    const {fname, lname, email, nic, pno, dob, nationality, gender, country, imageUrl} = req.body
    try {
      const updateValus={
        fname : fname,
        lname : lname,
        email : email,
        nic : nic,
        pno : pno,
        dob : dob,
        nationality : nationality,
        gender : gender,
        country : country,
        imageUrl : imageUrl
      };
  
      let traveler1 = await traveler.findOne({email})
   
      if (!traveler1) {
        throw new Error('There is no traveler account')
      }
  
      const travelerUpdate = await traveler.findByIdAndUpdate(req.traveler1.id,updateValus)
   
      res.status(200).send({status: 'Traveler Profile Updated', traveler1: travelerUpdate})
    } catch (error) {
      res.status(500).send({error: error.message})
      console.log(error)
    }
  })

  // delete admin
  router.delete("/delete", auth, async (req, res) => {
    try {
      const traveler1 = await traveler.findById(req.traveler1.id);
      if (!traveler1) {
        throw new Error("There is no Admin to delete");
      }
      const deleteProfile = await traveler.findByIdAndDelete(req.traveler1.id);
      res.status(200).send({ status: "user deleted", traveler1 : deleteProfile });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error with id", error: error.message });
    }
  });




module.exports = router;