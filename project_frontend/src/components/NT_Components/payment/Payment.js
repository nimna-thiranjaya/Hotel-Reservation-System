import axios from 'axios';
import React, { Component } from 'react'
import './payment.css'
import visa from '../../../asserts/NT_Asserts/visa.png'
import master from '../../../asserts/NT_Asserts/master.png'
import amx from '../../../asserts/NT_Asserts/amx.png'
export default class Payment extends Component {
  constructor(props){
    super(props);
    this.state={
      hname:"",
      amount:"",
      email:"",
      fname : "",
      sendemail:"",
      source:"",
      description:"",
      CheckinDate:"",
      resid:"",
      senderName:""
      
    }
  }
  componentDidMount(){
    this.getpaymetdetails();
  }

  getpaymetdetails(){
    const id = this.props.match.params.id;
    console.log(id)
    axios.get(`http://localhost:8280/payment/getReservation/${id}`).then((res)=>{
            // console.log(res.data)
            if(res.data.success){
                this.setState({
                    hname : res.data.paymentDetails.hname,
                    amount : res.data.paymentDetails.amount,
                    description : res.data.paymentDetails._id,
                    resid : res.data.paymentDetails._id,
                    CheckinDate : res.data.paymentDetails.CheckinDate
                })
                // console.log(this.state)
            }
        }).catch((e)=>{
            console.log(e)
        })
       this.getusermail(); 
  }

  getusermail(){
    try{
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        }   
    axios.get("http://localhost:8280/traveler/getProfile", config).then((res)=>{
        // console.log(res.data)
        if(res.data.success){
            this.setState({
              sendemail: res.data.traveler1.email,
              senderName : res.data.traveler1.fname + " " + res.data.traveler1.lname
            })
        }
    })

    }catch(error){
        console.log(error.message)
    }   
}

handleInputChange = (e)=>{
  const{name,value} = e.target;
  this.setState({
     ...this.state,
     [name]:value
  })
}

onSubmit=(e)=>{
    e.preventDefault();
    const{fname,email,source} = this.state;
    const data = {
      name:fname,
      email:email,
      source:source,
      amount:parseInt(this.state.amount),
      description:this.state.description
    }
    console.log(data)
    axios.post(`http://localhost:8280/payment/doPayment`,data).then((res)=>{
      console.log(res.data)
    if(res.data){      
      
      this.setState({
        amount:"",
        email:"",
        name : "",
        source:"",
        description:"",
      })
      console.log("paymet success")
      this.sendmail();
    }
  }).catch((error)=>{
    console.log(error)
  })
}
sendmail(){
  const emaildata = {
    reciverMail : this.state.sendemail ,
    senderMail : "DNReservation@gmail.com",
    reciverName : this.state.senderName,
    reservationid : this.state.resid,
    hotelname: this.state.hname,
    date : this.state.CheckinDate
  }

  axios.post("http://localhost:8000/payment/sendemail",emaildata).then((res)=>{
    if(res.status){
      alert("email send successful")
    }
  })
}
 
  render() {
    return (
      <div class="container content">
        <div class="row">
            <div class="col-xs-12 col-md-4 offset-md-4">
                <div class="card p-3">
                    <div class="card-header">
                        <div class="row">
                            <h4 class="text-xs-center">Payment Details :</h4>
                            {/* <img src={visa} style={{width: 50+"px"}}/> */}
                            <center>
                              <div className='col'>
                               <input  type="radio" name='source' onChange={this.handleInputChange} value={"tok_visa"}/> <label><img src={visa} style={{width: 70+"px", height: 70+"px"}} alt="visa"/> &nbsp;</label>  &nbsp;&nbsp;
                                <input type="radio" name='source'  onChange={this.handleInputChange} value={"tok_mastercard"}/> &nbsp;<label><img src={master} style={{width: 70+"px", height: 70+"px"}} alt="master"/> </label>&nbsp;&nbsp;&nbsp;
                                <input type="radio" name='source'  onChange={this.handleInputChange} value={"tok_amx"}/> &nbsp;<label><img src={amx} style={{width: 70+"px", height: 70+"px"}} alt="amx"/> </label>
                              </div>
                              </center>
                        </div>
                    </div>
                    <div class="card-block">
                        <form onSubmit={this.onSubmit}>
                        <div class="row">
                                <div class="col-xs-12">
                                    <div className="form-group mt-2">
                                        <label>Card Holder Name : </label>
                                        <input type="text" className="form-control mt-1" placeholder="Enter Card Holder Names" name='fname' onChange={this.handleInputChange} value={this.setState.fname}/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div className="form-group mt-2">
                                        <label>Card Number</label>
                                        <div class="input-group">
                                            <input type="tel" className="form-control mt-1" placeholder="0000 0000 0000 0000" maxLength={16} minLength={16} /> &nbsp;
                                            <span class="input-group-addon"><span class="fa fa-credit-card"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-7 col-md-7">
                                    <div className="form-group mt-2">
                                        <label>Expiry Date :</label>
                                        <input type="tel" className="form-control mt-1" placeholder="MM / YY" maxLength={5} minLength={5}/>
                                    </div>
                                </div>
                                <div class="col-xs-5 col-md-5 float-xs-right">
                                    <div className="form-group mt-2">
                                        <label>Securirty Code :</label>
                                        <input type="tel" className="form-control mt-1" placeholder="000" maxLength={3} minLength={3} />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div className="form-group mt-2">
                                        <label>Email :</label>
                                        <input type="text" className="form-control mt-1" placeholder="Enter Your Email" name='email' pattern="(?![.-])((?![.-][.-])[a-zA-Z\d.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}" onChange={this.handleInputChange} value={this.setState.email}/>
                                    </div>
                                </div>
                            </div>
                            <center>
                            <button class="btn btn-primary mt-3" style={{width:100+"%"}}>Process payment</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
  }
}