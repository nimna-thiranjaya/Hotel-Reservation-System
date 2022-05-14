import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";
//import Images from './images';
// import Button from '@mui/material/Button'
// import DeleteIcon from '@mui/icons-material/Delete';


export default class Show extends Component {

    constructor(props){
      super(props);
      this.state={
           images:[]
      }
  }

  onDelete = (id) =>{

    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

    if (window.confirm('Are you sure you wish to remove this image?')) {
        axios.delete(`http://localhost:8000/hotel/deleteImg/${id}`,config).then((res)=>{
                //alert("Delete successful");
                alert('Removed successfully');
                window.location.reload();
                 
        })
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
           
                <center><h4>
                    Images            
                </h4></center>
                    
               
          
            <div class="wrapper">
                    <div className="row" style={{ paddingTop: 15 }}>

                    {this.state.images.map((images)=>(
                        <div className="col-lg-3 col-md-3 col-sm-2">
                            <div style={{width: 230, height: 230, paddingBottom: 15}}>
                              <div class="cardwl" >
                                <div>
                                    <div className="card" style={{width: "18rem",marginTop: 15}}>
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

    

                
  


                            
 
        )
    
    }
    
    }