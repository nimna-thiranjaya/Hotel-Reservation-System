import axios from 'axios'
import React, { Component } from 'react'
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
        <div>
            <h2>Traveler Profile</h2>
            <div className='container'>
                <img src={this.state.imageUrl} alt="Profile_Picture" width="170" height="170"/>  <br/><br/>
                <p>Fname : {this.state.fname}</p>
                <p>Lname : {this.state.lname}</p>
                <p>Email : {this.state.email}</p>
                <p>NIC : {this.state.nic}</p>
                <p>phone No : {this.state.pno}</p>
                <p>DOB : {this.state.dob}</p>
                <p>Nationality : {this.state.nationality}</p>
                <p>Gender : {this.state.gender}</p>
                <p>Country : {this.state.country}</p><br/>
            </div>
                <button type="button" class="btn btn-primary" onClick={this.onUpdate}>Update Profile</button> &nbsp;
                <button type="button" class="btn btn-primary" onClick={this.adminLogout} >Log Out</button> &nbsp;
                <button type="button" class="btn btn-danger" onClick={this.onDelete}>Delete Profile</button>
        </div>
    )
  }
}
