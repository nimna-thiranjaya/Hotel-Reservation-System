import React, { Component } from 'react'
import axios from 'axios'



export default class ShowReservation extends Component {

    constructor(props){
        super(props)
        this.state ={
            rese:[],
                   
        }
    }
    componentDidMount(){
        this.getReservationDetails()
    }

    async getReservationDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
        await axios.get("http://localhost:8000/booking/myreservations", config).then((res)=>{
            
            if(res.data.status){
                this.setState({

                    rese : res.data.reservations
                                     
                });
                console.log(this.state.rese);
               
            }
        });

        }catch(error){
            console.log(error.message)
        }   
    }


onDelete = (id) => {
    if (window.confirm('Are you sure you wish to remove this reservation?')) {
    axios.delete(`http://localhost:8000/booking/delete/${id}`).then((res) =>{
        alert("Deleted Successfully");
        this.getReservationDetails();
    })
}
}


  render() {
    return (
      <div>

<table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
        <thead>
          <tr bgcolor="#D5D6EA">
            <th scope="col">No</th>
            <th scope="col">Hotel name</th>
            <th scope="col">Room Type</th>
            <th scope="col">Room Size</th>
            <th scope="col">Room Check in Date</th>
            <th scope="col">Room Nights Count</th>
            <th scope="col">room Amount</th>
            
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rese.map((rese,index)=>(
              <tr>
  
                <th scope="row">{index+1}</th>
                <td>{rese.hname}</td>
                <td>{rese.type}</td>
                <td>{rese.size}</td>
                <td>{rese.CheckinDate}</td>
                <td>{rese.nightsCount}</td>
                <td>{rese.amount}</td>

                <td>
                
                    <button type="submit" class="btn btn-danger" onClick={() =>this.onDelete(rese._id)} >Delete</button> 

                  &nbsp;
                    <a href={`/checkout/${rese._id}`}> <button type="submit" style={{width:"10rem"}}   class="btn btn-success btn-rounded">Pay Now</button> </a>
                  
                </td>
              </tr>
             
  
          ))}
          
        </tbody>
        
   </table>

      </div>
    )
  }
}
