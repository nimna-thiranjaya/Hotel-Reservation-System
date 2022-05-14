import React, { Component } from 'react'
import axios from "axios";
import HotelRooms from "./showRooms"


export default class AddRooms extends Component {
  constructor(props){
    super(props);
    this.state={
        type: "",
        size: "",
        pricePerNight: "",
        facilities: "",
        details: ""
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
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };
  

  e.preventDefault();
      const {type,size,pricePerNight,facilities,details} = this.state;
      const data = {type,size,pricePerNight,facilities,details};
      console.log(data)

      axios.post(`http://localhost:8000/hotel/addRoom`,data,config)
      .then(res=>{
              alert("Room Added")
              window.location = '/profile';
      }).catch((err)=>{
          alert(err)
      })

}


  render() {
      return (
       
          <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "30px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

                <center><h2 className="fw-bold mt-3"  style={{color: "gray"}}>ADD ROOM</h2></center>
                <form name="form" onSubmit={this.onSubmit}> 
                    <div style={{padding: "30px 30px 20px"}}>

                    <div class="row" >


                    <div class="col">

                        <div class="form-outline">
                        <label class="form-label" for="form8Example3">Room Type</label>
                        <select class="form-select" aria-label="Default select example" id="type"  onChange={this.handleInputChange} value={this.setState.type} name="type">
                            <option selected>Select Room Type</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Semi-Luxury">Semi-Luxury</option>
                            <option value="Normal">Normal</option>
                        </select>
                        
                        </div>
                    </div>
                    <div class="col">

                        <div class="form-outline">
                        <label class="form-label" for="form8Example5">Room Size</label>
                        <select class="form-select" aria-label="Default select example" id="size"  onChange={this.handleInputChange} value={this.setState.size} name="size">
                            <option selected>Select Room Size</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Family">Family</option>
                        </select>

                        </div>
                    </div>
                    </div>

                    <hr />

                    <div class="row" >


                    <div class="col">

                        <div class="form-outline">

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="pricePerNight" id="floatingInput" placeholder="pricePerNight" onChange={this.handleInputChange} value={this.setState.pricePerNight} required/>
                            <label for="floatingInput">Price Per Night</label>
                        </div>
                        
                        </div>
                    </div>
                    <div class="col">
                    </div>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea id="floatingInput" name="facilities" style={{height: "100px"}} type="text"  class="form-control" placeholder="Facilities"  onChange={this.handleInputChange} value={this.setState.facilities} required/>
                        <label for="floatingInput">Facilities</label>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea id="floatingInput" name="details" style={{height: "100px"}} type="text"  class="form-control" placeholder="Details"  onChange={this.handleInputChange} value={this.setState.details} required/>
                        <label for="floatingInput">Details</label>
                    </div>
                    
            <button type="submit" style={{marginLeft: "86%"}} className="btn btn-primary btn-block mb-4">
              ADD ROOM
            </button>
    
            </div> 
          </form> 
          </div>   
        
  
      )
  
  }
  
  }