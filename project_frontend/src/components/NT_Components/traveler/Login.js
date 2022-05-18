import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.userLoginSubmit = this.userLoginSubmit.bind(this)
    
        this.state = {
          email: "",
          password: "",
          token: "",
          open: false
        }
      }
  
  
      async userLoginSubmit(e) {
        e.preventDefault()
        const userData = {
          email: this.state.email,
          password: this.state.password
        }
  
        
    
        await axios.post("http://localhost:8000/traveler/login",userData)
        .then((res) => {
          this.setState({
            token: res.data.token
          })
          localStorage.setItem("Authorization", res.data.token)
          alert("loging complete");
          window.location = "/home";
          
        })
        .catch((err) => {
          console.log(err)
          this.setState({open: true})
          alert("loging error");
        })
      }
  render() {
    return (
    <div className='content'>
      <div class="login-form1">
      <form onSubmit={this.userLoginSubmit} >
          <h2 class="text-center">Log in</h2>       
          <div class="form-group">
              <input type="text" class="form-control" placeholder="Email" required="required" name='email' onChange={e => this.setState({ email: e.target.value })}/>
          </div><br/>
          <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" required="required" name='password' onChange={e => this.setState({ password: e.target.value })}/>
          </div><br/>
          <div class="clearfix">
              <label class="form-check-label mr-0"><input type="checkbox"/> Remember me</label>
          </div> <br/>
          <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" style={{width: 100+"%"}}>Log in</button>
          </div><br/>
       
      </form>
      <p class="text-center"><a href="/register">Create an Account</a></p>
  </div>
    </div>
    )
  }
}
