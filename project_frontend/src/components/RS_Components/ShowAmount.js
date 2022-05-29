import axios from 'axios';
import React, { Component } from 'react'
import Header from '../Layouts/Header';
import image from "../../asserts/DH_Asserts/rer.jpg"


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

<div>
      <Header/>

      <div>
             
             <section className="vh-200" style={{backgroundColor: "#D8BFD8"}}>
               <div className="container py-5 h-100">
                 <div className="row d-flex justify-content-center align-items-center h-50">
                   <div className="col col-xl-10">
                     <div className="card" style={{borderRadius: "1rem", marginBottom:"1rem"}}>
                       <div className="row g-0">
                         <div className="col-md-6 col-lg-5 d-none d-md-block">
                           <img src={image}
                             alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem" }}/>
                         </div>
                         <div className="col-md-6 col-lg-7 d-flex align-items-center">
                           <div className="card-body p-4 p-lg-5 text-black">
             
                             <form  name="form">
             
                               <div className="d-flex align-items-center mb-3 pb-1">
                                 <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                                 <span className="h1 fw-bold mb-0">Checkout</span>
                               </div>
             
                              
             
                               <hr/>
                                    <dl className="row">
                                          
                                      <dt className="col-sm-4"  ><h5>Hotel Name:</h5></dt>
                                      <dd className ="col-sm-5" align ="left" ><h5>{hname}</h5></dd>
                                      <br/>

                                      <dt className="col-sm-4" ><h5>Room Type:</h5></dt>
                                      <dd className ="col-sm-5" align="left"><h5>{type}</h5></dd>
                                      <br/>

                                      <dt className="col-sm-4" ><h5>Room Size:</h5></dt>
                                      <dd className ="col-sm-5" align="left"><h5>{size}</h5></dd>
                                      <br/>

                                      <dt className="col-sm-4" ><h5> Check in Date:</h5></dt>
                                      <dd className ="col-sm-5" align="left"><h5>{CheckinDate}</h5></dd>
                                      <br/>

                                      <dt className="col-sm-4" ><h5> Nights Count:</h5></dt>
                                      <dd className ="col-sm-5" align="left"><h5>{nightsCount}</h5></dd>
                                      <br/>
                                      <br/>

                                      <dt className="col-sm-4"><h5> Total Amount:</h5></dt>
                                      <dd className ="col-sm-5" align="left"> <h4>LKR {amount}.00</h4></dd>
                                      
                                      </dl>
                                      <br/>

             
                                      <div >
                                      <a href='/show'> <button type="button"  class="btn btn-secondary" style={{width:"8rem"}}>Back</button> </a> &nbsp;&nbsp; <a href={`/payment/${_id}`}><button type="button" style={{width:"8rem"}} class="btn btn-success">Pay Now</button> </a>
                                      </div>
                                      <br/>
                             </form>
             
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>
             
                        
             </div>



      
      </div>

      
    )
  }
}
