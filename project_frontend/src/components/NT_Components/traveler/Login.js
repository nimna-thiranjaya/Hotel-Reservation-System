import React, { Component } from 'react'
import axios from 'axios'
import image from "../../../asserts/NT_Asserts/MctTzB.jpg"
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
  
        
    
        await axios.post("http://localhost:8280/traveler/travelerLogin",userData)
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
  //   <div className='content'>
  //     <div class="login-form1">
  //     <form onSubmit={this.userLoginSubmit} >
  //         <h2 class="text-center">Log in</h2>       
  //         <div class="form-group">
  //             <input type="text" class="form-control" placeholder="Email" required="required" name='email' onChange={e => this.setState({ email: e.target.value })}/>
  //         </div><br/>
  //         <div class="form-group">
  //             <input type="password" class="form-control" placeholder="Password" required="required" name='password' onChange={e => this.setState({ password: e.target.value })}/>
  //         </div><br/>
  //         <div class="clearfix">
  //             <label class="form-check-label mr-0"><input type="checkbox"/> Remember me</label>
  //         </div> <br/>
  //         <div class="form-group">
  //             <button type="submit" class="btn btn-primary btn-block" style={{width: 100+"%"}}>Log in</button>
  //         </div><br/>
       
  //     </form>
  //     <p class="text-center"><a href="/register">Create an Account</a></p>
  // </div>
  //   </div>

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
              <div className='mb-5 text-end'>
                  <a href='/login'><button className="btn btn-primary btn-lg btn-block">Login as Hotel</button></a>
              </div>
                

                <form onSubmit={this.userLoginSubmit} name="form">

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">DNR Reservations</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Traveller Sign In</h5>

                  <div class="form-floating mb-3">
                <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={e => this.setState({ email: e.target.value })} required/>
                <label for="floatingInput">Email address</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="password" id="floatingInput" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} required/>
                <label for="floatingInput">Password</label>
              </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

   
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="/register"
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
