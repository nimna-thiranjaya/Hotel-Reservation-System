import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";
//import Images from './images';



export default class Profile extends Component {

    constructor(props){
      super(props);
      this.state={
           hotel:{}
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
                hotel:res.data.hotel
            });
            
        }
        console.log(this.state.hotel)
    })
}


    render() {
        const {hname,details,address, phone, email, image } = this.state.hotel;

        return (
             
                <div>
                    <div>
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
                        
                    </div>
            </div>



                            
 
        )
    
    }
    
    }