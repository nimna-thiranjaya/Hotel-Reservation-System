import React, { Component } from 'react'
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.userLoginSubmit = this.userLoginSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
    
        this.state = {
          email: "",
          pwd: "",
          token: "",
          open: false
        }
      }
   
   
      async userLoginSubmit(e) {
        e.preventDefault()
        const userData = {
          email: this.state.email,
          pwd: this.state.pwd
        }
   
        
    
        await axios.post("http://localhost:8000/hotel/login",userData)
        .then((res) => {
          this.setState({
            token: res.data.token
          })
          localStorage.setItem("Authorization", res.data.token)
          window.location = "/profile"
          alert('loging successfull');
        })
        .catch((err) => {
          console.log(err)
          this.setState({open: true})
          alert('loging unsucces',err);
        })
      }
    
      handleClose(reason) {
        if (reason === 'clickaway') {
         return;
        }
        this.setState({open: false})
     };
   
     
   
      render() {
        return (
          
               
               <div>
  
                      <form onSubmit={this.userLoginSubmit} name="form"> 
  
                        <label  >Student ID</label>
                        <input  type="text" name="username" placeholder="Enter your email" onChange={e => this.setState({ email: e.target.value })} required/> <br/><br/> 
                        <label  >Password</label> 
                        <input  type="password" name="password" placeholder="Enter your Password" onChange={e => this.setState({ pwd: e.target.value })} required/> 
                        <br/>   
                          
                        <button type="submit" >Login</button> 
                        
                          
                      </form>
               
                <center><label >Not Registered?</label> </center>
                <center><li><a href="/signup" >Sign Up</a></li></center>
                
              
                </div>
           
  
      
        )
      }
}

