import React, { Component } from 'react'
import axios from "axios";
import FileBase64 from 'react-file-base64';


export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      hname:"",
      details:"",
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
      const {hname,details,email,phone,pwd,image} = this.state;
      const data = {hname,details,email,phone,pwd,image};
      console.log(data)

      axios.post(`http://localhost:8000/hotel/signup`,data)
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
              
              <form name="form" onSubmit={this.onSubmit}> 
                             
                            <h1>Hotel Name</h1>
                                 <input type="text" name="hname"  placeholder="Hotel Name"
                                  onChange={this.handleInputChange} value={this.setState.hname} required/>

                            <h1>Hotel Details</h1>
                                 <input type="text" name="details"  placeholder="Details"
                                  onChange={this.handleInputChange} value={this.setState.details} required/>

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
                             
              </form>     
                                              
          </div>     
        
  
      )
  
  }
  
  }