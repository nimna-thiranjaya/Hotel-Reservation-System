import React, { Component } from 'react'
import axios from 'axios'
import {  FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import Header from '../Layouts/Header';





export default class ShowRooms extends Component {

  constructor (props){
    super(props);
    this.state={

      room:{},
      images:[],
      roomDetailes:[]
    };
  }


  handleInputChange = (e) => {
    const {name,value} = e.target;
    this.setState({
        ...this.state,
        [name]:value
    })
}

onSubmit = id2 => e =>{

  const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

  const id1 = this.props.match.params._id;

    e.preventDefault();
   
    const { 
      CheckinDate,
      CheckoutDate,
      nightsCount} = this.state;

    const data = { 
            CheckinDate,
            CheckoutDate,
            nightsCount};
    

    axios.post(`http://localhost:8280/reservation/addReservation/${id1}/${id2}`,data ,config)
    .then(res=>{
      console.log(config)
            alert("reservation successful")
           
    }).catch((err)=>{
        alert("You already have reservations on this day!!!")
    })

}


  componentDidMount(){
    const _id = this.props.match.params._id;
    
    axios.get(`http://localhost:8280/reservation/getSpecificHotel/${_id}`).then((res)=>{
      console.log(res.data);
      if (res.data.success){
        this.setState({
          room:res.data.hotel,
          images:res.data.hotel.images,
          roomDetailes:res.data.hotel.rooms
          
          

        });
  
        console.log(res.data.hotel.rooms);
      }
    });
  
  }

  
  
  shiftLeft = () =>{
    const newOrder = []

    this.state.images.forEach((src, index) =>{
      const newIndex = --index < 0 ? this.state.images.length -1 : index
      newOrder[newIndex] = src
    })
    this.setState({images:newOrder})

  }


  shiftRight = () => {
    const newOrder = []

    this.state.images.forEach((src, index) =>{
      const newIndex = ++index >= this.state.images.length ? 0 : index
      newOrder[newIndex] = src
        
    })
  
    this.setState({ images:newOrder})
  }


  


  render(){

    const{hname,details,address,phone,email,image} = this.state.room;
    // const{type,size,pricePerNight,facilities} = this.state.roomDetailes;
    
    

    return(
      <div>
            <Header/>
          

      <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-9 mt-10 mx-auto" >

      <div style = {{marginTop:'20px'}} className="container-sm" >

      <div className="card-header py-3">
              <h1 className="m-0 font-weight-bold text-dark" id="rs"> {hname}</h1><br/>
  
    </div>
           
      <div className="card-image waves-effect waves-block waves-light" align="center">
          <img className="activator"  style={{ width: '350px', height: '180px%' }} src={image} alt="hotelImage"/></div>

      <hr/>
      <dl className="row">
             
        <dt className="col-sm-3">Details</dt>
        <dd className ="col-sm-9" >{details}</dd>
        <br/><br/><br/><br/>

        <dt className="col-sm-3">Address</dt>
        <dd className ="col-sm-9" align="left">{address}</dd>
        <br/>

        <dt className="col-sm-3">Phone</dt>
        <dd className ="col-sm-9" align="left">{phone}</dd>

        <dt className="col-sm-3"> Email</dt>
        <dd className ="col-sm-9" align="left">{email}</dd>
        </dl>

        <br/><br/>
            
 <div className="Carousel"  >            
        <div className="container"  >
       
          <div>
            <FaArrowCircleLeft class="left-arrow" onClick={this.shiftLeft} size="32"/>
          </div>    
          
          {this.state.images.map((src, index) =>
              <div key={index} >
                <img id={'pic' + index} src={src.image}
                alt="img" />
                
              </div>             
          )}
          
          <div>
            <FaArrowCircleRight class="right-arrow" onClick={this.shiftRight} size="32"/>
          </div>           
          </div>
         </div>
         
         <div className="wrapperr" >
     <div className="row" style={{ paddingTop: 1 , paddingBottom: 1, alignContent :'center'  }} >
       
        {this.state.images.map((item) => (
            
            <div className="card"  style={{ borderRadius:"22px",width: "10rem",height:"10rem" , marginRight: "1rem", colorRenderin: "20rem" , marginTop: "1rem"}}>
            <img className="card-img-top" src={item.image} alt="Card_image_cap"  style={{ borderRadius:"27px", borderColor: "#000000", height: "10rem",marginTop: 15,marginRight:1,marginLeft:1}}/>
           
           
            <div className="card-body" >
                    
            </div>
            
                  
            </div>
        ))}
      </div>
      </div>
      <br/><br/><br/><br/>

      <div>           
            <div class="btn pull-right">
                   <a href='/show'>
                   <button type="button" style={{width:"15rem"}} class="btn btn-outline-warning">My Reservations</button>
                   </a>
                   <br/><br/>
            </div>

                <table class="table table-bordered border-primary">
            <thead class="thead-dark">
              <tr>
                
                <th scope="col">Room Type</th>
                <th scope="col">Size</th>
                <th scope="col">Facilities</th>
                <th scope="col">Price Per Night</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {this.state.roomDetailes.map((roomDetailes, index) =>
              <tr>
                
                <td style={{width:25+"%"}}>{roomDetailes.type}</td>
                <td style={{width:5+"%"}}>{roomDetailes.size}</td>
                <td style={{width:30+"%"}}>{roomDetailes.facilities}</td>
                <td style={{width:12+"%"}}>LKR {roomDetailes.pricePerNight}.00</td>
                <td style={{width:12+"%"}}>
                  
                  <form onSubmit={this.onSubmit(roomDetailes._id)}>
                                  
    
                  Check-in Date
                      <input type="date"
                    className="form-control"
                    name="CheckinDate"
                    value={this.setState.CheckinDate}
                    onChange={this.handleInputChange} required/>
                  
                    Check-out Date
                      <input type="date"
                    className="form-control"
                    name="CheckoutDate"                    
                    value={this.setState.CheckoutDate}
                    onChange={this.handleInputChange} required/>
                <br/>
                    <input type="number" className="form-control" name="nightsCount" placeholder="Nights Count" Required = "required"
                    value={this.setState.nightsCount }
                    
                    onChange={this.handleInputChange} />

                <br/>
                <button type="submit" style={{width:"15rem", align:"center"}}   class="btn btn-success btn-rounded">I'll reserve</button>
                    <br/><br/>
                   
                  </form>
                  </td>
                {/* <td>{size}</td>
                <td>{hname}</td> */}
                
                
              </tr>
              )}
            </tbody>
          </table>
          
        
      </div>
          {/* <div class="col-md-12 bg-light text-right">
          <button type="button" style={{width:"10rem"}}  href={``} class="btn btn-success btn-rounded">I'll reserve</button>
          </div> */}
          <br/><br/><br/><br/><br/><br/>
        

        
      </div>
      </div>
      </div>
      </div>
    
      
     
    )
  }
}

