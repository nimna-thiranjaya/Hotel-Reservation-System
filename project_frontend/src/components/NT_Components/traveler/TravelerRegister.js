import axios from 'axios';
import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import image from "../../../asserts/NT_Asserts/ss.jpg"
import {toast} from 'react-toastify';

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
            axios.post("http://localhost:8280/traveler/regTraveler",traveler).then((res)=>{
                if(res.data){
                    alert("Traveler register successful")
                    window.location.href = '/';
                }
            
            }).catch((e)=>{
                console.log(e);
            })
        }else{
            toast.warn('Passwords Not Match',{position:toast.POSITION.TOP_Right});
          }
     }
    return (
    <div>
            <section className="text-center">
            <div className="p-5 bg-image" style={{backgroundImage: `url(${image})`,height: "300px",backgroundSize: 'cover'}}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "-130px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`,marginBottom:"3rem"}}>
                <div className="card-body py-5 px-md-5">

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <form  name="form" onSubmit={trevelerRegister}>


                        
                    <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" onChange={(e)=>{setfname(e.target.value);}}  required/>
                            <label for="floatingInput">First Name</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" onChange={(e)=>{setlname(e.target.value);}}  required/>
                            <label for="floatingInput">Last Name</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC" 
                            pattern ="[0-9]{12}||[0-9]{9}[v||V]"
                            onChange={(e)=>{setnic(e.target.value);}}
                            required/>
                            <label for="floatingInput">NIC</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" name="dob" id="dob" placeholder="Date of Birth" onChange={(e)=>{setdob(e.target.value);}} />
                            <label for="floatingInput">Date Of Birth</label>
                        </div>
                        </div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" name="email" id="email" placeholder="name@example.com" 
                            pattern="(?![.-])((?![.-][.-])[a-zA-Z\d.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                            onChange={(e)=>{setemail(e.target.value);}}  required/>
                            <label for="floatingInput">Email</label>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                        <select className="form-control" required="required" id="gender" placeholder="Gender"  name="gender" onChange={(e)=>{setgender(e.target.value);}}>
                            <option selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="phone" class="form-control" name="phone" id="pno" placeholder="Phone Number" minLength={10} onChange={(e)=>{setpno(e.target.value);}}  required/>
                            <label for="floatingInput">Phone Number</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" name="password" id="pwd" placeholder="Password" 
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$"  required="true"
                            onChange={(e)=>{setpassword(e.target.value);}}/>
                            <label for="floatingInput">Password</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" name="cpassword" id="cpwd" placeholder="Password" 
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$"  required="true"
                            onChange={(e)=>{setcpassoword(e.target.value);}}/>
                            <label for="floatingInput">Confirm Password</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="country" id="country" placeholder="country" onChange={(e)=>{setcountry(e.target.value);}}  required/>
                            <label for="floatingInput">Country</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="nationality" id="nationality" placeholder="Nationality" onChange={(e)=>{setnationality(e.target.value);}}  required/>
                            <label for="floatingInput">Nationality</label>
                        </div>
                        </div>
                        </div>


                        <div class="custom-file">
                        <h5><label class="custom-file-label" for="customFileLangHTML">Image : </label></h5><br/>
                        <FileBase64 class="form-control form-control-sm" id="formFileSm" type="file" multiple={ false } onDone={({base64}) => setimageUrl(base64)} required/>
                        </div>

                        <br/><br/>

                        <div className='mt-4'>
                               <input class='btn btn-secondary' type="reset" value="Reset" style={{width: 20+"%"}}/> &nbsp;&nbsp;&nbsp;
                               <input class='btn btn-primary' type="submit" value="Register" style={{width: 20+"%"}}/> 
                           </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </section>

    </div>
    )
}

export default TravelerRegister;