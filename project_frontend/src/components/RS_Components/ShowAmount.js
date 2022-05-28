import axios from 'axios';
import React, { Component } from 'react'


export default class ShowAmount extends Component {
    constructor (props){
        super(props);
        this.state={
    
          reservationDelails:[]
        };
      }




    componentDidMount(){
        const id = this.props.match.params.id;
      
        axios.get(`http://localhost:8280/reservation/getSpecificResevation/${id}`).then((res)=>{
          console.log(res.data);

          if (res.data.status){
            this.setState({
              
              reservationDelails:res.data.reservation
            
    
            });
      
            
          }
        });
      
      }
    



  render() {

    const{_id,hname,type,size,CheckinDate,nightsCount,amount} = this.state.reservationDelails;
    return (

      <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt-8 mx-auto" >
              
      
  
    </div>

      <div className="container-sm" >
       
      <div>
          <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-5 mt-10 mx-auto" >

      <div style = {{marginTop:'20px'}} className="container-sm" >

      <div className="card-header py-3">
              <h1 className="m-0 font-weight-bold text-dark" id="rs">Checkout</h1><br/>
              <div className="card-bodyr" id="cardcol">
    </div>
    
           
      <hr/>
      <dl className="row">
             
        <dt className="col-sm-3" align ="center" >Hotel Name</dt>
        <dd className ="col-sm-9" align ="left" >{hname}</dd>
        <br/>

        <dt className="col-sm-3" align ="center">Room Type</dt>
        <dd className ="col-sm-9" align="left">{type}</dd>
        <br/>

        <dt className="col-sm-3" align ="center">Room Size</dt>
        <dd className ="col-sm-9" align="left">{size}</dd>
        <br/>

        <dt className="col-sm-3" align ="center"> Check in Date</dt>
        <dd className ="col-sm-9" align="left">{CheckinDate}</dd>
        <br/>

        <dt className="col-sm-3" align ="center"> Nights Count</dt>
        <dd className ="col-sm-9" align="left">{nightsCount}</dd>
        <br/>
        <br/>

        <dt className="col-sm-3"><h3> Total Amount</h3></dt>
        <dd className ="col-sm-9" align="left"> <h3>{amount}</h3></dd>
        
        </dl>
        <br/><br/>


        <div>
         <a href={`/payment/${_id}`}><button type="button" class="btn btn-warning">Pay Now</button> </a>
      </div>
      <br/>
      </div>
      </div>
      </div>
      </div>
      </div>   </div>   </div>

      
    )
  }
}
