import axios from 'axios'
import React, { Component } from 'react'
import Header from '../../Layouts/Header'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state ={
            fname: "",
            lname: "",
            email: "",
            nic : "",
            pno : "",
            dob : "",
            nationality : "",
            gender : "",
            country : "",
            imageUrl : ""
        }
    }
    componentDidMount(){
        this.getTravelerDetails()
    }

    async getTravelerDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
        await axios.get("http://localhost:8000/traveler/profile", config).then((res)=>{
            console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname: res.data.traveler1.fname,
                    lname: res.data.traveler1.lname,
                    email: res.data.traveler1.email,
                    nic : res.data.traveler1.nic,
                    pno : res.data.traveler1.pno,
                    dob : res.data.traveler1.dob,
                    nationality : res.data.traveler1.nationality,
                    gender : res.data.traveler1.gender,
                    country : res.data.traveler1.country,
                    imageUrl : res.data.traveler1.imageUrl
                })
                //console.log(this.state)
            }
        })

        }catch(error){
            console.log(error.message)
        }   
    }

    adminLogout(){
        if (window.confirm('Are you sure you wish to logout from this Account?')) {
            localStorage.removeItem('Authorization')
            console.log("log out complete")
            window.location = "/"
        }
    }

    onUpdate(){
        window.location.href="/update"
    }

    onBack(){
        window.location.href="/home"
    }

    async onDelete(){
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        }

        if (window.confirm('Are you sure you wish to delete this Account?')) {
            await axios.delete('http://localhost:8000/traveler/delete', config).then((res) => {
              localStorage.removeItem('Authorization')
              alert("Your Account delete successfull")
              window.location="/"
            })
            .catch((err) => {
              console.log(err.message)
            })
        }
    }
  render() {
    return (
        // <div>
        //     <h2>Traveler Profile</h2>
        //     <div className='container'>
        //         <img src={this.state.imageUrl} alt="Profile_Picture" width="170" height="170"/>  <br/><br/>
        //         <p>Fname : {this.state.fname}</p>
        //         <p>Lname : {this.state.lname}</p>
        //         <p>Email : {this.state.email}</p>
        //         <p>NIC : {this.state.nic}</p>
        //         <p>phone No : {this.state.pno}</p>
        //         <p>DOB : {this.state.dob}</p>
        //         <p>Nationality : {this.state.nationality}</p>
        //         <p>Gender : {this.state.gender}</p>
        //         <p>Country : {this.state.country}</p><br/>
        //     </div>
        //         <button type="button" class="btn btn-primary" onClick={this.onUpdate}>Update Profile</button> &nbsp;
        //         <button type="button" class="btn btn-primary" onClick={this.adminLogout} >Log Out</button> &nbsp;
        //         <button type="button" class="btn btn-danger" onClick={this.onDelete}>Delete Profile</button>
        // </div>

        <div>
            <Header/>
            <div class="container mt-4">
            <div class="main-body">
    
 
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">Home</a></li>

              <li class="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>
         
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="cardN2">
                <div class="cardN2-body">
                  <div class="d-flex flex-column align-items-center text-center">
                  <img src={this.state.imageUrl} alt="Profile_Picture" class="rounded-circle" width="150"/>
                   
                    <div class="mt-3">
                      <h4>{this.state.fname} {this.state.lname}</h4>
                      <p class="text-secondary mb-1">
                      {this.state.email}
                      </p>
                      <p class="text-muted font-size-sm">{this.state.pno}</p>
                      <button class="btn btn-primary" onClick={this.adminLogout} style={{width: 80+"%"}}>Log Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="cardN2 mb-3">
                <div class="cardN2-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {this.state.fname} {this.state.lname}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">NIC</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {this.state.nic}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {this.state.email}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">phone No</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {this.state.pno}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date of Birth</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {this.state.dob}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {this.state.gender}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Country</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {this.state.country}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nationality</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {this.state.nationality}
                    </div>
                  </div>
                  <hr/>
                  <center>
                  <div class="row">
                    <div class="col-sm-12">
                    <button class="btn btn-secondary" style={{width: 20+"%"}} onClick={this.onBack}>Back</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button class="btn btn-primary" style={{width: 20+"%"}} onClick={this.onUpdate}>Update Profile</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" onClick={this.onDelete} style={{width: 20+"%"}}>Delete Profile</button>
                    </div>
                  </div></center>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
    )
  }
}
