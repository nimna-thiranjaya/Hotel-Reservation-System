import React from "react";
import { Component } from 'react';
import axios from "axios";



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
         
                <div>
                    <div>
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
                        </table>
                    </div>



          
    
        )
    
    }
    
    }