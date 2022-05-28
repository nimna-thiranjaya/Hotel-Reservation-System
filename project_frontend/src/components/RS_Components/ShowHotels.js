import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import Header from '../Layouts/Header';


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
      axios.get("http://localhost:8280/reservation/getHotels").then(res =>{
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
      <div>
      <Header/>
      
      <div className="backgroundR" style={{  backgroundImage: 'url(https://c.neh.tw/thumb/f/720/5104431798419456.jpg)'
        }} >

      <div class="container-sm">
      
    <div className="wrapperR">
      
     <div className="row" style={{ paddingTop: 1 , paddingBottom: 1,  }} >
       
        {this.state.hotels.map((item) => (
            
            <div className="card" style={{ borderRadius:"22px",width: "19rem" , marginRight: "1rem", colorRenderin: "20rem" , marginTop: "1rem" ,  }}>
            <img className="card-img-top" src={item.image} alt="Card_image_cap" style={{ borderRadius:"27px", borderColor: "#000000", width: "", height: "12rem",marginTop: 15,marginRight:1,marginLeft:1}} />
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
         
      </div>
      </div>
      </div>
      
      
      
      
    )
  }
}
