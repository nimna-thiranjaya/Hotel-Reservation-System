import React, { Component } from 'react'
import axios from "axios";
import FileBase64 from 'react-file-base64';
import image from "../../asserts/DH_Asserts/ss.jpg"


export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      hname:"",
      details:"",
      address:"",
      email:"",
      phone:"",
      pwd:"",
      cpwd:"",
      image:""
    }
}

handleInputChange = (e) => {
    const {name,value} = e.target;
    this.setState({
        ...this.state,
        [name]:value
    }) 
} 

onSubmit = (e) =>{
  console.log(this.state.pwd)
  
if(this.state.pwd === this.state.cpwd){
  e.preventDefault();
      const {hname,details,address,email,phone,pwd,image} = this.state;
      const data = {hname,details,address,email,phone,pwd,image};
      console.log(data)

      axios.post(`http://localhost:8280/hotel/hotelSignup`,data)
      .then(res=>{
              alert("Hotel Registered")
              window.location = '/login';
      }).catch((err)=>{
          alert(err)
      })
    }else{
      alert("Password does not match!")
    }
}


  render() {
      return (
       
          <div>
              
              {/* <form name="form" onSubmit={this.onSubmit}> 
                             
                            <h1>Hotel Name</h1>
                                 <input type="text" name="hname"  placeholder="Hotel Name"
                                  onChange={this.handleInputChange} value={this.setState.hname} required/>

                            <h1>Hotel Details</h1>
                                 <input type="text" name="details"  placeholder="Details"
                                  onChange={this.handleInputChange} value={this.setState.details} required/>

                            <h1>Hotel Address</h1>
                                 <input type="text" name="address"  placeholder="address"
                                  onChange={this.handleInputChange} value={this.setState.address} required/>

                            <h1>Email Address</h1>
                                 <input type="text" name="email"  placeholder="Email Address"
                                  onChange={this.handleInputChange} value={this.setState.email} required/>

                            <h1>Phone</h1>
                                 <input type="text" name="phone"  placeholder="Phone number"
                                  onChange={this.handleInputChange} value={this.setState.phone} required/>

                            <h1>Password</h1>
                                 <input type="text" name="pwd"  placeholder="Password"
                                  onChange={this.handleInputChange} value={this.setState.pwd} required/>
           
                            <h1>Confirm Password</h1>
                                 <input type="text" name="cpwd"  placeholder="Confirm password"
                                  onChange={this.handleInputChange} value={this.setState.cpwd} required/>

                            
                            <h1>Image</h1>
                            <div>
                                  <FileBase64 type="file" name="image" multiple={ false } onDone={({ base64 }) => this.setState({ image: base64 })}required/>
                            </div>

                             <br/>                   
                             <center><button type="submit">
                                     Register
                                 </button></center>
                             
              </form>      */}


<section className="text-center">
  <div className="p-5 bg-image" style={{backgroundImage: `url(${image})`,height: "300px",backgroundSize: 'cover'}}></div>

  <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "-130px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`,marginBottom:"3rem"}}>
    <div className="card-body py-5 px-md-5">

      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <form  name="form" onSubmit={this.onSubmit}>


            
          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="hname" id="floatingInput" placeholder="Hotel Name"  onChange={this.handleInputChange} value={this.setState.hname} required/>
            <label for="floatingInput">Hotel Name</label>
          </div>

            <div className="row">
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.setState.email} required/>
                <label for="floatingInput">Email address</label>
              </div>
              </div>
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="phone" class="form-control" name="phone" id="floatingInput" placeholder="Phone Number" onChange={this.handleInputChange} value={this.setState.phone} required/>
                <label for="floatingInput">Phone Number</label>
              </div>
              </div>
            </div>


            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="address" id="floatingInput" placeholder="Address" onChange={this.handleInputChange} value={this.setState.address} required/>
                <label for="floatingInput">Address</label>
              </div>

            <div class="form-floating mb-3">
              <textarea id="floatingInput" name="details" style={{height: "100px"}} type="text"  class="form-control" placeholder="Details"  onChange={this.handleInputChange} value={this.setState.details} required/>
              <label for="floatingInput">Details</label>
            </div>



            <div className="row">
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="pwd" id="floatingInput" placeholder="Password" onChange={this.handleInputChange} value={this.setState.pwd} required/>
                <label for="floatingInput">Password</label>
              </div>
              </div>
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="cpwd" id="floatingInput" placeholder="Password" onChange={this.handleInputChange} value={this.setState.cpwd} required/>
                <label for="floatingInput">Confirm Password</label>
              </div>
              </div>
            </div>


            <div class="custom-file">
            <h5><label class="custom-file-label" for="customFileLangHTML">Image : </label></h5><br/>
            <FileBase64 type="file" class="custom-file-input" id="customFileLangHTML" name="image" multiple={ false } onDone={({ base64 }) => this.setState({ image: base64 })} hidden required/>
            </div>

            <br/><br/>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
                                              
          </div>     
        
  
      )
  
  }
  
  }