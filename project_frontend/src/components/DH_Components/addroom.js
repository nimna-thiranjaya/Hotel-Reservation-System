import React, { Component } from 'react'
import axios from "axios";



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

    //   axios.post(`http://localhost:8000/hotel/addRoom`,data,config)
    //   .then(res=>{
    //           alert("Hotel Registered")
    //           //window.location = '/login';
    //   }).catch((err)=>{
    //       alert(err)
    //   })

}


  render() {
      return (
       
          <div>
              
              <form name="form" onSubmit={this.onSubmit}> 
                             
                            <h1>Room Type</h1>

                            <select id="type"  onChange={this.handleInputChange} value={this.setState.type} name="type">
                                <option selected>Select Room type</option>
                                <option value="Volvo">Luxury</option>
                                <option value="Saab">Semi-Luxury</option>
                                <option value="Fiat">Normal</option>
                            </select>
                                 {/* <input type="text" name="type"  placeholder="Type"
                                  onChange={this.handleInputChange} value={this.setState.type} required/> */}

                            <h1>Size</h1>

                            <select id="type"  onChange={this.handleInputChange} value={this.setState.size} name="type">
                                <option selected>Select Room Size</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Family">Family</option>
                            </select>
                                 {/* <input type="text" name="size"  placeholder="Details"
                                  onChange={this.handleInputChange} value={this.setState.size} required/> */}

                            <h1>Price per night</h1>
                                 <input type="text" name="pricePerNight"  placeholder="address"
                                  onChange={this.handleInputChange} value={this.setState.pricePerNight} required/>

                            <h1>Facilities</h1>
                                 <input type="text" name="facilities"  placeholder="facilities"
                                  onChange={this.handleInputChange} value={this.setState.facilities} required/>

                            <h1>Details</h1>
                                 <input type="text" name="details"  placeholder="details"
                                  onChange={this.handleInputChange} value={this.setState.details} required/>

                             <br/>                   
                             <center><button type="submit">
                                     Add
                                 </button></center>
                             
              </form>     
                                              
          </div>     
        
  
      )
  
  }
  
  }