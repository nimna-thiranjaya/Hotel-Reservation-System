import axios from 'axios'
import React, { Component } from 'react'

export default class TravelerUpdate extends Component {
    constructor(props){
        super(props)
        this.state ={
            fname: "",
            lname: "",
            email: "",
            nic : "",
            pno : "",
            dob : "",
            nationality : "",
            gender : "",
            country : "",
            imageUrl : ""
        }
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount(){
        this.getTravelerDetails()
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

    async getTravelerDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
        await axios.get("http://localhost:8000/traveler/profile", config).then((res)=>{
            // console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname: res.data.traveler1.fname,
                    lname: res.data.traveler1.lname,
                    email: res.data.traveler1.email,
                    nic : res.data.traveler1.nic,
                    pno : res.data.traveler1.pno,
                    dob : res.data.traveler1.dob,
                    nationality : res.data.traveler1.nationality,
                    gender : res.data.traveler1.gender,
                    country : res.data.traveler1.country,
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
            fname,
            lname,
            email,
            nic,
            pno,
            dob,
            nationality,
            gender,
            country,
            imageUrl
        } = this.state

       const Updatetraveler = {
            fname : fname,
            lname : lname,
            email : email,
            nic : nic,
            pno : pno,
            dob : dob,
            nationality : nationality,
            gender : gender,
            country : country,
            imageUrl : imageUrl
        }

        console.log(Updatetraveler)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 

        axios.put("http://localhost:8000/traveler/update",Updatetraveler, config).then((res)=>{
            if(res.data){
                this.setState({
                    fname : "",
                    lname : "",
                    email : "",
                    nic : "",
                    pno : "",
                    dob : "",
                    nationality : "",
                    gender : "",
                    country : "",
                    imageUrl : ""
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
            <h3>Traveler Registration</h3>
            <form className='container'>
                fname : <input type="text" name="fname" onChange={this.handleInputChange} value={this.state.fname}/><br/><br/>
                lname : <input type="text" name="lname" onChange={this.handleInputChange} value={this.state.lname}/><br/><br/>
                email : <input type="text" name="email" onChange={this.handleInputChange} value={this.state.email} readOnly/><br/><br/>
                nic : <input type="text" name="nic" onChange={this.handleInputChange} value={this.state.nic}/><br/><br/>
                phone no : <input type="text" name="pno" onChange={this.handleInputChange} value={this.state.pno}/><br/><br/>
                dob : <input type="text" name="dob" onChange={this.handleInputChange} value={this.state.dob}/><br/><br/>
                nationality : <input type="text" name="nationality" onChange={this.handleInputChange} value={this.state.nationality}/><br/><br/>
                gender : <input type="text" name="gender" onChange={this.handleInputChange} value={this.state.gender}/><br/><br/>
                country : <input type="text" name="country" onChange={this.handleInputChange} value={this.state.country}/><br/><br/>
                imageUrl : <input type="file" name="imageUrl"  onChange={this.onFileChange}/><br/><br/>
                <input type="button" onClick={this.onBack} value="Back"/> &nbsp;
                <input type="submit" onClick={this.onSubmit} value="submit"/>
            </form>
        </div>
    )
  }
}
