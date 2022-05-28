import axios from 'axios'
import React, { Component } from 'react'

export default class RoomUpdate extends Component {cl
    constructor(props){
        super(props)
        this.state ={
            type:"",
            size:"",
            pricePerNight:"",
            facilities:"",
            details:""
        }
    }
    componentDidMount(){
        this.getroomsize()
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
    }

    async getroomsize(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            } 
            const id = this.props.match.params.id;
            axios.get(`http://localhost:8280/hotel/getHotelRoom/${id}`,config).then(res =>{
                if(res.data.status){
                this.setState({
                    type : res.data.room.type,
                    size : res.data.room.size,
                    pricePerNight : res.data.room.pricePerNight,
                    facilities : res.data.room.facilities,
                    details : res.data.room.details
                })
            }
        })

        }catch(error){
            console.log(error.message)
        }   
    }

    onSubmit = (e) => {
        e.preventDefault();
        const{
            type,
            size,
            pricePerNight,
            facilities,
            details
        } = this.state

       const Updateroom = {
            type : type,
            size : size,
            pricePerNight : pricePerNight,
            facilities : facilities,
            details : details
        }

        console.log(Updateroom)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 
        const id = this.props.match.params.id;

        axios.put(`http://localhost:8280/hotel/updateRooms/${id}`,Updateroom, config).then((res)=>{
            if(res.data){
                this.setState({
                    type:"",
                    size:"",
                    pricePerNight:"",
                    facilities:"",
                    details:""
                })
                alert("update success")
                window.location.href="/profileD"
           }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onBack(){
        window.location.href="/showRooms"
    }



  render() {
    return (
        <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "30px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`, boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

        <center><h2 className="fw-bold mt-3"  style={{color: "gray"}}>UPDATE ROOM DETAILS</h2></center>
        <form name="form" onSubmit={this.onSubmit}> 
            <div style={{padding: "30px 30px 20px"}}>

            <div class="row" >


            <div class="col">

                <div class="form-outline">
                <label class="form-label" for="form8Example3">Room Type</label>
                <select class="form-select" aria-label="Default select example" id="type"  onChange={this.handleInputChange} value={this.state.type}  name="type">
                    <option selected>{this.state.type}</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Semi-Luxury">Semi-Luxury</option>
                    <option value="Normal">Normal</option>
                </select>
                
                </div>
            </div>
            <div class="col">

                <div class="form-outline">
                <label class="form-label" for="form8Example5">Room Size</label>
                <select class="form-select" aria-label="Default select example" id="size"  onChange={this.handleInputChange} value={this.state.size} name="size">
                    <option selected>{this.state.size}</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Family">Family</option>
                </select>

                </div>
            </div>
            </div>

            <hr />

            <div class="row" >


            <div class="col">

                <div class="form-outline">

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="pricePerNight" id="floatingInput" placeholder="pricePerNight" onChange={this.handleInputChange} value={this.state.pricePerNight} required/>
                    <label for="floatingInput">Price Per Night</label>
                </div>
                
                </div>
            </div>
            <div class="col">
            </div>
            </div>

            <div class="form-floating mb-3">
                <textarea id="floatingInput" name="facilities" style={{height: "100px"}} type="text"  class="form-control" placeholder="Facilities"  onChange={this.handleInputChange} value={this.state.facilities} required/>
                <label for="floatingInput">Facilities</label>
            </div>

            <div class="form-floating mb-3">
                <textarea id="floatingInput" name="details" style={{height: "100px"}} type="text"  class="form-control" placeholder="Details"  onChange={this.handleInputChange} value={this.state.details} required/>
                <label for="floatingInput">Details</label>
            </div>
            
    <button type="submit" style={{marginLeft: "83%"}} className="btn btn-primary btn-block mb-4">
      UPDATE ROOM
    </button>

    </div> 
  </form> 
  </div>   
    )
  }
}