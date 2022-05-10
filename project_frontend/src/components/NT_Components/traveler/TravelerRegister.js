import axios from 'axios';
import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';


function TravelerRegister(){

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [nic, setnic] = useState("")
    const [pno, setpno] = useState("")
    const [dob, setdob] = useState("")
    const [nationality, setnationality] = useState("")
    const [gender, setgender] = useState("")
    const [country, setcountry] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassoword] = useState("")
    const [imageUrl, setimageUrl] = useState("")


     function trevelerRegister(e){
        e.preventDefault();

        const traveler = {
            fname,
            lname,
            email,
            nic,
            pno,
            dob,
            nationality,
            gender,
            country,
            password,
            cpassword,
            imageUrl
        }

        console.log(traveler)
        if(password === cpassword){
            axios.post("http://localhost:8000/traveler/register",traveler).then((res)=>{
                if(res.data){
                    alert("Traveler register successful")
                    window.location.href = '/';
                }
            
            }).catch((e)=>{
                console.log(e);
            })
        }else{
            console.log("Password not match")
          }
     }

     function onBack(){
         window.location.href="/"
     }

    return (
        <div>
        <h3>Traveler Registration</h3>
          <form className='container'>
              fname : <input type="text" name="fname" onChange={(e)=>{setfname(e.target.value);}}/><br/><br/>
              lname : <input type="text" name="lname" onChange={(e)=>{setlname(e.target.value);}}/><br/><br/>
              email : <input type="text" name="email" onChange={(e)=>{setemail(e.target.value);}}/><br/><br/>
              nic : <input type="text" name="nic" onChange={(e)=>{setnic(e.target.value);}}/><br/><br/>
              phone no : <input type="text" name="pno" onChange={(e)=>{setpno(e.target.value);}}/><br/><br/>
              dob : <input type="text" name="dob" onChange={(e)=>{setdob(e.target.value);}}/><br/><br/>
              nationality : <input type="text" name="nationality" onChange={(e)=>{setnationality(e.target.value);}}/><br/><br/>
              gender : <input type="text" name="gender" onChange={(e)=>{setgender(e.target.value);}}/><br/><br/>
              country : <input type="text" name="country" onChange={(e)=>{setcountry(e.target.value);}}/><br/><br/>
              password : <input type="password" name="password" onChange={(e)=>{setpassword(e.target.value);}}/><br/><br/>
              confirm password : <input type="password" name="cpassword" onChange={(e)=>{setcpassoword(e.target.value);}}/><br/><br/>
              imageUrl : <FileBase64 type="file" name="imageUrl" multiple={ false } onDone={({base64}) => setimageUrl(base64)}/><br/><br/>
              <input type="button" onClick={onBack} value="Back"/> &nbsp;
              <input type="submit" onClick={trevelerRegister} value="submit"/>
          </form>
    </div>
    )
}

export default TravelerRegister;