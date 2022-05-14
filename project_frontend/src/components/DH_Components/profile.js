import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";
//import Images from './images';
import image1 from "../../asserts/DH_Asserts/ss.jpg"


export default class Profile extends Component {

    constructor(props){
      super(props);
      this.state={
           hotel:{},
           images:[]
      }
  }


componentDidMount(){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

    axios.get(`http://localhost:8000/hotel/profile`,config).then(res =>{
    if(res.data.success){
            this.setState({
                hotel:res.data.hotel,
                images:res.data.hotel.images
            });
            
        }
        console.log(this.state.images)
    })
}


    render() {
        const {hname,details,address, phone, email, image } = this.state.hotel;
        const images = this.state.images;

        return (
             
                <div>
                    {/* <div>
                     <div>
                        <center><h4>
                        Hotel
                        </h4></center>
                            
                           
                        </div>
                        <img src={image} width="170" height="170"/>
                        <p>{hname}</p>
                        <p>{details}</p>
                        <p>{address}</p>
                        <p>{phone}</p>
                        <p>{email}</p>

                        <button type="submit" onClick={()=>this.request()} >Request</button>

                        <a href = "/update">
                        <button type="submit">Update</button>
                        </a>

                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>
  
                    <div>
                        
                    </div> */}



<section class="h-100 gradient-custom-2" >
  <div class="container py-5 h-100" >
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div>
        <div class="card" >
          <div class="rounded-top text-white d-flex flex-row" style={{backgroundImage:`url(${image1})`, height:"200px"}}>
            <div class="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
              <img src={image}
                alt="Generic placeholder image" class="rounded-top rounded-bottom  mt-4 mb-2"
                style={{width: "20rem", height:"15rem", zIndex: "1",marginLeft:"20rem"}}/>

            </div>
            <div class="" style={{marginTop: "130px",marginLeft:"40rem"}}>
              <h5>{hname}</h5>
              <p>New York</p>
            </div>
          </div>
          <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                style={{zIndex: "1",marginTop:"1rem"}}>
                Edit profile
              </button>
          <div class="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">253</p>
                <p class="small text-muted mb-0">Photos</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h5">1026</p>
                <p class="small text-muted mb-0">Followers</p>
              </div>
              <div>
                <p class="mb-1 h5">478</p>
                <p class="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style={{backgroundColor: "#f8f9fa"}}>
                <p class="font-italic mb-1">Web Developer</p>
                <p class="font-italic mb-1">Lives in New York</p>
                <p class="font-italic mb-0">Photographer</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0">Recent photos</p>
              <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
            </div>
            <div class="row g-2">
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="image 1" class="w-100 rounded-3"/>
              </div>
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="image 1" class="w-100 rounded-3"/>
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