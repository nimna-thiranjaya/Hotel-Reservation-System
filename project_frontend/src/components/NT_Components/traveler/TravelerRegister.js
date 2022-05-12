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
    return (
        <div>
        <div class="container">
                <div class=" text-center mt-4">
                    <h3 >Traveler Registration</h3>
                </div>
            <div className="row ">
            <div className="col-lg-7 mx-auto">
                <div className="cardN mt-2 mx-auto p-4">
                    <div class="cardN-body">
            
                    <div className = "container">
                    <form>
                    <div className="controls">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="form_name">Firstname :</label>
                                    <input  type="text" name="fname" className="form-control" placeholder="Please enter your firstname" required="required" onChange={(e)=>{setfname(e.target.value);}}/>
                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Lastname :</label>
                                    <input  type="text" name="lname" className="form-control" placeholder="Please enter your lastname" required="required" onChange={(e)=>{setlname(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-8 mx-auto mt-2">
                                <div className="form-group">
                                    <label className='mx-auto'>Email :</label>
                                    <input  type="text" className="form-control" placeholder="Please enter your Email" required="required" name="email" onChange={(e)=>{setemail(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label className='mx-auto'>NIC :</label>
                                    <input  type="text" className="form-control" placeholder="Please enter your NIC" required="required" data-error="Lastname is required." name="nic" onChange={(e)=>{setnic(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label className='mx-auto'>Gender :</label>
                                    <div className="form-group">
                                <select className="form-control" required="required" data-error="Please specify your Gender" name="gender" onChange={(e)=>{setgender(e.target.value);}}>
                                    <option selected>-- Select Your Gender --</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                                   
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label for="form_name">Phone No :</label>
                                    <input  type="text" className="form-control" placeholder="Please enter your Phone No" required="required" name="pno" onChange={(e)=>{setpno(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label >Date Of Birth :</label>
                                    <input  type="date" className="form-control" placeholder="Please enter your Date of Birth" required="required" name="dob" onChange={(e)=>{setdob(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label for="form_name">Country :</label>
                                    <input  type="text" className="form-control" placeholder="Please enter your Country" required="required" name="country" onChange={(e)=>{setcountry(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label >Nationality :</label>
                                    <input  type="text"  className="form-control" placeholder="Please enter your Nationality" required="required" name="nationality" onChange={(e)=>{setnationality(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label for="form_name">Password :</label>
                                    <input  type="password" className="form-control" placeholder="Please enter your Password" required="required" name="password" onChange={(e)=>{setpassword(e.target.value);}} />
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label >Confirm Password :</label>
                                    <input  type="password" className="form-control" placeholder="Please enter your Confirm Password" required name="cpassword" onChange={(e)=>{setcpassoword(e.target.value);}} />
                                </div>
                            </div>
                            <center>
                            <div class="col-md-8 mx-auto mt-3">
                                <label>Profile Image :</label> &nbsp;
                                <FileBase64 class="form-control form-control-sm" id="formFileSm" type="file" multiple={ false } onDone={({base64}) => setimageUrl(base64)}/>
                            </div>
                            </center>
                            <center>
                            <div className='mt-4'>
                                <input class='btn btn-secondary' type="reset" value="Reset" style={{width: 20+"%"}}/> &nbsp;&nbsp;&nbsp;
                                <input class='btn btn-primary' type="button" value="Register" onClick={trevelerRegister} style={{width: 20+"%"}}/> 
                            </div>
                        </center>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            <br/>
            <p class="text-center"> Do you have Account already? <a href="/">Login</a></p>
            </div>
        </div>
        </div>
    </div>
    )
}

export default TravelerRegister;