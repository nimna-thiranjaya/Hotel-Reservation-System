import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from '@mui/material/Button';


export default class ShowHotels extends Component {
    constructor(props){
        super(props);
        
        this.state={
             hotels:[],
        }
    }
    
    componentDidMount(){
      this.retriveHotels();
    }
    
    
    retriveHotels(){
      axios.get("http://localhost:8000/booking/displayhotel").then(res =>{
        if(res.data.success){
          this.setState({
            hotels:res.data.existinghotel
          });
          console.log(this.state.hotels)
        }
      });
    }

  

  render() {
    return (
      

      <div style={{  backgroundImage: 'url(https://wallpapermemory.com/uploads/515/resort-background-hd-1920x1200-486717.jpg)', height: "100%", width: "100%"}}>

<div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt- mx-auto"  id="cardcol">
         
      
      
        
    <div className="wrapper">
     <div className="row" style={{ paddingTop: 1 , paddingBottom: 1,  }} >
       
        {this.state.hotels.map((item) => (
            
            <div className="card" style={{ borderRadius:"22px",width: "19rem" , marginRight: "1rem", colorRenderin: "20rem" , marginTop: "1rem"}}>
            <img className="card-img-top" src={item.image} alt="Card image cap" style={{ borderRadius:"27px", borderColor: "#000000", width: "", height: "12rem",marginTop: 15,marginRight:1,marginLeft:1}}/>
            <div className="card-body">
              <h5 className="card-title">{item.hname}</h5>
    
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{item.address}</li>
              <li className="list-group-item">{item.phone}</li>
            </ul>
            <div className="card-body">
                    
            </div>
                    <Button variant="outlined" href={`/hotel/${item._id}`}> See More</Button>
                    &nbsp;&nbsp;&nbsp;
            </div>
        ))}
      </div>
      </div>
        
        
      
      </div></div>
      </div>
      
    )
  }
}
