import React from "react";
import { Component } from 'react';
import axios from "axios";
import image1 from "../../asserts/DH_Asserts/ss.jpg"

import FileBase64 from 'react-file-base64';
import image11 from "../../asserts/DH_Asserts/png-transparentl.png"


export default class Profile extends Component {

    constructor(props){
      super(props);
      this.state={
           hotel:{},
           images:[],
           image:"",
           rooms:[]
      }
  }


  handleInputChange = (e) => {
    const {name,value} = e.target;
    this.setState({
        ...this.state,
        [name]:value
    }) 
} 

  onSubmitI = (e) =>{

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
  
    e.preventDefault();
        const {image} = this.state;
        const data = {image};
        console.log(data)
  
        if(data.image === undefined){
            alert("image is undefined");
        }else(
        axios.post(`http://localhost:8280/hotel/uploadImages`,data,config)
        .then(res=>{
                alert("image uploaded")
                window.location.reload();
        }).catch((err)=>{
            alert(err)
        })
        )
  }


  onDeleteR = (id) =>{
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    if (window.confirm('Are you sure you wish to remove this room?')) {
        axios.delete(`http://localhost:8280/hotel/deleteHotelroom/${id}`,config).then((res)=>{
                //alert("Delete successful");
                alert('Removed successfully');
                window.location.reload();
                 
        })
    }
    
  }



  onDelete = (id) =>{

    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

    if (window.confirm('Are you sure you wish to remove this image?')) {
        axios.delete(`http://localhost:8280/hotel/hotelImageDelete/${id}`,config).then((res)=>{
                //alert("Delete successful");
                alert('Removed successfully');
                window.location.reload();
                 
        })
    }
    
 }



 displayrooms(){
  const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

  axios.get(`http://localhost:8280/hotel/getHotelRooms`,config).then(res =>{
  if(res.data.success){
          this.setState({
              rooms:res.data.rooms
          });

      }

  })
}


  displayProfile(){
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

  axios.get(`http://localhost:8280/hotel/hotelProfile`,config).then(res =>{
  if(res.data.success){
          this.setState({
              hotel:res.data.hotel,

          });
          
      }
  })
  }


  displayImages(){
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

  axios.get(`http://localhost:8280/hotel/getHotelImages`,config).then(res =>{
  if(res.data.success){
          this.setState({
              images:res.data.images
          });
          
      }
      console.log(this.state.images)
  })
  }


componentDidMount(){
  this.displayProfile();
  this.displayImages();
  this.displayrooms();
}


    render() {
        const {hname,details,address, phone, email, image } = this.state.hotel;

        return (
             
                <div>


    <div className="p-5 bg-image" style={{backgroundImage: `url(${image1})`,height: "200px",backgroundSize: 'cover'}}>
    <div class="panel-heading" style={{color:"white",fontSize:"50px"}}>
              <h4 class="panel-title">HOTEL PROFILE</h4>
              </div>
    <div class="container" style={{marginTop:"10px"}}>
      
    <div class="row">


      <div class="col-xs-12 col-sm-9" >
        <div class="panel panel-default" className="card  shadow-5-strong" style={{marginTop: "30px", padding:"10px 10px 10px 10px" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
 
          <div class="panel-body">
            <div class="profile__avatar">
              <img style={{borderRadius:"7px"}} src={image} alt="..."/>
            </div>
            <div class="profile__header">
              <h3>{hname} </h3><small>Sri Lanka</small>
            </div>
          </div>
        </div>

      </div>







      <div class="col-xs-12 col-sm-3">
       
       
        <div class="profile__contact-info" style={{marginTop: "30px", padding:"20px 10px 10px 20px" ,height:"21rem" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-phone"></i>
            </div>
            <div class="profile__contact-info-body">
              <h5 class="profile__contact-info-heading">Contact Number</h5>
              {phone}
            </div>
          </div>

          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-envelope-square"></i>
            </div>
            <div class="profile__contact-info-body">
              <h5 class="profile__contact-info-heading">E-mail address</h5>
              <a href="mailto:admin@domain.com">{email}</a>
            </div>
          </div>
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-map-marker"></i>
            </div>
            <div class="profile__contact-info-body">
              <h5 class="profile__contact-info-heading">Work address</h5>
              {address}
            </div>
          </div>
          
        </div>

      </div>
    </div>





    <div class="panel panel-default" style={{marginTop: "30px", padding:"10px 10px 10px 10px" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <div class="panel-heading">
          <h4 style={{color:"gray"}} class="panel-title">Hotel Information</h4>
          </div>
          <div class="panel-body">
            <table class="table profile__table">
              <tbody>
                <tr>
                  <th><strong>Hotel Name</strong></th>
                  <td>{hname}</td>
                </tr>
                <tr>
                  <th><strong>Location</strong></th>
                  <td>{address}</td>
                </tr>
                <tr>
                  <th><strong>Hotel Details</strong></th>
                  <td>{details}</td>
                </tr>
              </tbody>
            </table>
            <a href = "/updateD">
            <button style={{marginLeft:"90%"}} type="button" class="btn btn-primary">Update Profile</button></a>

      
      

          </div>
        </div>







        <div class="row">
        <div class="col-xs-12 col-sm-3">
       
       
       <div class="profile__contact-info" style={{marginTop: "30px", padding:"20px 10px 10px 20px" ,height:"18.75rem" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
         <div class="profile__contact-info-item">
           <div class="profile__contact-info-icon">
             <i class="fa fa-image"></i>
           </div>
           <div class="profile__contact-info-body">
             <h5 class="profile__contact-info-heading">Add Images</h5>

              <br/><br/><br/><br/>
             <div>
              
              <form name="form" onSubmit={this.onSubmitI}> 

                            <div>
                                  <FileBase64 type="file" name="image" multiple={ false } onDone={({ base64 }) => this.setState({ image: base64 })}required/>
                            </div>

                             <br/><br/><br/>                 
                             <button style={{marginLeft:"40px"}} class="btn btn-primary" type="submit">
                                     Add Image
                                 </button>
                             
              </form>     
                                              
          </div> 
   
       
           </div>
         </div>


         
       </div>

     </div>






     <div class="col-xs-12 col-sm-9" >
        
        <div class="panel panel-default" className="card  shadow-5-strong" style={{marginTop: "30px", padding:"10px 10px 10px 10px" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
 
        <div class="wrapper">
                    <div className="row" >

                    {this.state.images.map((images)=>(
                        <div className="col-lg-4">
                            <div style={{ paddingBottom: 15}}>
                              <div class="cardwl" >
                                <div>
                                    <div className="card" style={{marginTop: 15}}>
                                        <img src={images.image} alt="" style={{height: "10rem",borderRadius:"5px"}}/>
                                            
                                        <button  onClick={()=>this.onDelete(images._id)} class="button1"><i class="fa fa-trash"></i></button>
                                            
                                    </div>
                                </div>
                                <br/>

                        </div>
                        </div>
                        </div>

                    ))}
                    </div>
                    </div>
            </div>
          </div>
        </div> 






        <div class="panel panel-default" style={{marginTop: "30px", padding:"10px 10px 10px 10px" ,background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <div class="row">
            <h4 style={{marginLeft:"5px"}} class="profile__contact-info-heading">Room Details</h4>
            <a href = "/addRoom"><button style={{marginLeft:"84.5%",padding:"5px 60px"}} type="button" class="btn btn-warning">Add Room</button></a>
            <br/><br/>
        </div>
            
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                <th>No</th>
                  <th>Room Type</th>
                  <th>Size</th>
                  <th>Details</th>
                  <th>Facilities</th>
                  <th>Price Per Night</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.rooms.map((rooms,index)=>(
                <tr>
                <td>
                    <div class="d-flex align-items-center">

                      <div class="ms-3">
                        <p class="fw-bold mb-1">{index+1}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                          src={image11}
                          alt=""
                          style={{width: "45px", height: "45px"}}
                          class="rounded-circle"
                          />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">{rooms.type}</p>
                      
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">{rooms.size}</p>
                    
                  </td>
                  <td>
                  <p class="fw-normal mb-1">{rooms.details}</p>
                  </td>
                  <td>{rooms.facilities}</td>
                  <td>
                  <p class="fw-bold mb-1">{rooms.pricePerNight}</p>
                  </td>
                  <td style={{width:"100px"}}>
                    {/* <button type="button" class="btn btn-link btn-sm btn-rounded">
                      Edit
                    </button> */}
                    <ul class="list-inline m-0">

                                                            <li class="list-inline-item">
                                                                <a  href={`/updateRoom/${rooms._id}`}><button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button></a>
                                                            </li>
                                                            <li class="list-inline-item">
                                                                <button style={{padding:"4px 10px"}} class="btn btn-danger btn-sm rounded-0" onClick={()=>this.onDeleteR(rooms._id)} type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                                            </li>
                                                        </ul>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
                    </div>
                      <br/><br/><br/><br/><br/>
            </div>
            </div>
            </div>



                            
 
        )
    
    }
    
    }