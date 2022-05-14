import axios from 'axios'
import React, { Component } from 'react'

export default class RoomUpdate extends Component {
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
            axios.get(`http://localhost:8000/hotel/getRoom/${id}`,config).then(res =>{
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

        axios.put(`http://localhost:8000/hotel/roomUpdate/${id}`,Updateroom, config).then((res)=>{
            if(res.data){
                this.setState({
                    type:"",
                    size:"",
                    pricePerNight:"",
                    facilities:"",
                    details:""
                })
                alert("update success")
                window.location.href="/profile"
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
        <div>
            <h3>room Update</h3>
            <form className='container'>
                type : <input type="text" name="type" onChange={this.handleInputChange} value={this.state.type}/><br/><br/>
                size : <input type="text" name="size" onChange={this.handleInputChange} value={this.state.size}/><br/><br/>
                pricePerNight : <input type="text" name="pricePerNight" onChange={this.handleInputChange} value={this.state.pricePerNight}/><br/><br/>
                facilities : <input type="text" name="facilities" onChange={this.handleInputChange} value={this.state.facilities}/><br/><br/>
                details : <input type="text" name="details"  onChange={this.handleInputChange} value={this.state.details}/><br/><br/>
                <input type="button" onClick={this.onBack} value="Back"/> &nbsp;
                <input type="submit" onClick={this.onSubmit} value="submit"/>
            </form>
        </div>
    )
  }
}