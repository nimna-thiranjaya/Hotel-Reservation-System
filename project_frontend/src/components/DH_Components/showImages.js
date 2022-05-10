import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";
//import Images from './images';



export default class Show extends Component {

    constructor(props){
      super(props);
      this.state={
           images:[]
      }
  }


componentDidMount(){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

    axios.get(`http://localhost:8000/hotel/displayImgs`,config).then(res =>{
    if(res.data.success){
            this.setState({
                images:res.data.images
            });
            
        }
        console.log(this.state.images)
    })
}


    render() {
  

        return (
            <div>
            <div>
            <center><h4>
                Images            
            </h4></center>
                
               
            </div>

                    {this.state.images.map((images)=>(
                     
                           <a href={`/viewImage/${images._id}`}>
                            <img src={images.image}  style={{marginRight:"5px",maxWidth:"30%",maxHeight:"100%",overflow:"scroll"}}/>
                            </a>

  
                        
                       
                    ))}
       
        </div>

                
  


                            
 
        )
    
    }
    
    }