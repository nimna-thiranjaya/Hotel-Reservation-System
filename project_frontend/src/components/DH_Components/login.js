import React, { Component } from 'react'
import axios from "axios";
import image from "../../asserts/DH_Asserts/MctTzB.jpg"

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
   
        
    
        await axios.post("http://localhost:8280/hotel/hotelLogin",userData)
        .then((res) => {
          this.setState({
            token: res.data.token
          })

          localStorage.setItem("Authorization", res.data.token)
          window.location = "/profileD"
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
             
<section className="vh-200" style={{backgroundColor: "#D8BFD8"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem", marginBottom:"1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={image}
                alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem" }}/>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={this.userLoginSubmit} name="form">

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">DNR RESERVATIONS</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Hotel Sign In</h5>

                  <div class="form-floating mb-3">
                <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={e => this.setState({ email: e.target.value })} required/>
                <label for="floatingInput">Email address</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="pwd" id="floatingInput" placeholder="Password" onChange={e => this.setState({ pwd: e.target.value })} required/>
                <label for="floatingInput">Password</label>
              </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

   
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="/aa"
                      style={{color: "#393f81"}}>Register here</a></p>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

           
</div>
      
        )
      }
}

