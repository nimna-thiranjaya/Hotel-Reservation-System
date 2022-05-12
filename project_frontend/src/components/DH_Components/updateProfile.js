import axios from 'axios'
import React, { Component } from 'react'

export default class TravelerUpdate extends Component {
    constructor(props){
        super(props)
        this.state ={
            hname:"",
            details:"",
            email:"",
            phone:"",
            image:""
        }
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount(){
        this.getHotelDetails()
    }

    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            this.setState({
                imageUrl: event.target.result,
            })
        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
    }

    async getHotelDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
            axios.get(`http://localhost:8000/hotel/profile`,config).then(res =>{
                if(res.data.success){
                this.setState({
                    hname : res.data.hotel.hname,
                    details : res.data.hotel.details,
                    email : res.data.hotel.email,
                    phone : res.data.hotel.phone,
                    image : res.data.hotel.image
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
            hname,
            details,
            email,
            phone,
            image
        } = this.state

       const UpdateHotel = {
            hname : hname,
            details : details,
            email : email,
            phone : phone,
            image : image
        }

        console.log(UpdateHotel)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 

        axios.put("http://localhost:8000/hotel/update",UpdateHotel, config).then((res)=>{
            if(res.data){
                this.setState({
                    hname:"",
                    details:"",
                    email:"",
                    phone:"",
                    image:""
                })
                alert("update success")
                window.location.href="/profile"
           }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onBack(){
        window.location.href="/profile"
    }



  render() {
    return (
        <div>
            <h3>Hotel Update</h3>
            <form className='container'>
                hname : <input type="text" name="hname" onChange={this.handleInputChange} value={this.state.hname}/><br/><br/>
                details : <input type="text" name="details" onChange={this.handleInputChange} value={this.state.details}/><br/><br/>
                email : <input type="text" name="email" onChange={this.handleInputChange} value={this.state.email} readOnly/><br/><br/>
                phone : <input type="text" name="phone" onChange={this.handleInputChange} value={this.state.phone}/><br/><br/>
                image : <input type="file" name="image"  onChange={this.onFileChange}/><br/><br/>
                <input type="button" onClick={this.onBack} value="Back"/> &nbsp;
                <input type="submit" onClick={this.onSubmit} value="submit"/>
            </form>
        </div>
    )
  }
}