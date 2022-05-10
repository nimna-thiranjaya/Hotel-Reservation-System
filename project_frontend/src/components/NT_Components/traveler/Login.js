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
          window.location = "/";
          
        })
        .catch((err) => {
          console.log(err)
          this.setState({open: true})
          alert("loging error");
        })
      }
  render() {
    return (
        <div>
        <h3>Traveler Login</h3><br/>
        <form onSubmit={this.userLoginSubmit}>
          email : <input type="text" name='email' onChange={e => this.setState({ email: e.target.value })}/> <br/><br/>
          password : <input type="text" name='password' onChange={e => this.setState({ password: e.target.value })}/> <br/><br/>
          <input type="submit" value="Login"/>
        </form>
    </div>
    )
  }
}
