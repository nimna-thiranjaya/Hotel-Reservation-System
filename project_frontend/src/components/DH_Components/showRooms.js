import React from "react";
import { Component } from 'react';
import axios from "axios";
import image from "../../asserts/DH_Asserts/png-transparentl.png"


export default class Rooms extends Component {

    constructor(props){
      super(props);
      this.state={
           rooms:[],
      }
  }
  

  



  displayrooms(){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };
  
    axios.get(`http://localhost:8000/hotel/displayRooms`,config).then(res =>{
    if(res.data.success){
            this.setState({
                rooms:res.data.rooms
            });

        }

    })
}

onDelete = (id) =>{

    if (window.confirm('Are you sure you wish to remove this room?')) {
        axios.delete(`http://localhost:8000/hotel/roomDelete/${id}`).then((res)=>{
                //alert("Delete successful");
                alert('Removed successfully');
                window.location.reload();
                 
        })
    }
    
  }




componentDidMount(){
    this.displayrooms();
}




    render() {
        return (
         
                <div className='container'>
                    {/* <div>
                        <center><h4>
                        Registerd Group Members
                        </h4></center>
                            
                           
                        </div>
                        <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
                            <thead>
                                <tr bgcolor="#D5D6EA">
                                <th scope="col">No</th>
                                <th scope="col">Type</th>
                                <th scope="col">size</th>
                                <th scope="col">Price Per Night</th>
                                <th scope="col">Facilities</th>
                                <th scope="col">details</th>

                                </tr>
                            </thead>  
                            <tbody>
                                {this.state.rooms.map((rooms,index)=>(
                                   <tr>
                                        <th scope = "row">{index +1}</th>
                                        <td>{rooms.type}</td>
                                        <td>{rooms.size}</td>
                                        <td>{rooms.pricePerNight}</td>
                                        <td>{rooms.facilities}</td>
                                        <td>{rooms.details}</td>
                                        <td>
 
                                        <button type="submit" onClick={()=>this.onDelete(rooms._id)} >Remove</button>
                                        <a href={`/updateRoom/${rooms._id}`}>
                                        <button type="submit"  >Update</button>
                                        </a>
                                        </td>
                                    </tr>
                                   
                                ))}
                            </tbody>
                        </table> */}



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
            <p class="fw-bold mb-1">1</p>
          </div>
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <img
              src={image}
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
      <td>
        {/* <button type="button" class="btn btn-link btn-sm btn-rounded">
          Edit
        </button> */}
         <ul class="list-inline m-0">

                                                <li class="list-inline-item">
                                                    <a  href={`/updateRoom/${rooms._id}`}><button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button></a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <button class="btn btn-danger btn-sm rounded-0" onClick={()=>this.onDelete(rooms._id)} type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                                </li>
                                            </ul>
      </td>
    </tr>
    ))}
  </tbody>
</table>
                    </div>



          
    
        )
    
    }
    
    }