import axios from 'axios'
import React, { Component } from 'react'
import FileBase64 from 'react-file-base64';
import image from "../../asserts/DH_Asserts/ss.jpg"

export default class HotelUpdate extends Component {
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
            axios.get(`http://localhost:8280/hotel/hotelProfile`,config).then(res =>{
                if(res.data.success){
                this.setState({
                    hname : res.data.hotel.hname,
                    details : res.data.hotel.details,
                    address : res.data.hotel.address,
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
            address,
            email,
            phone,
            image
        } = this.state

       const UpdateHotel = {
            hname : hname,
            details : details,
            address : address,
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

        axios.put("http://localhost:8280/hotel/uploadImages",UpdateHotel, config).then((res)=>{
            if(res.data){
                this.setState({
                    hname:"",
                    details:"",
                    address:"",
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
<section className="text-center">
  <div className="p-5 bg-image" style={{backgroundImage: `url(${image})`,height: "300px",backgroundSize: 'cover'}}></div>

  <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "-130px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`,marginBottom:"3rem"}}>
    <div className="card-body py-5 px-md-5">

      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5">Update Profile</h2>
          <form  name="form" >


            
          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="hname" id="floatingInput" placeholder="Hotel Name"  onChange={this.handleInputChange} value={this.state.hname} required/>
            <label for="floatingInput">Hotel Name</label>
          </div>

            <div className="row">
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.state.email} required/>
                <label for="floatingInput">Email address</label>
              </div>
              </div>
              <div className="col-md-6 mb-4">
              <div class="form-floating mb-3">
                <input type="phone" class="form-control" name="phone" id="floatingInput" placeholder="Phone Number" onChange={this.handleInputChange} value={this.state.phone} required/>
                <label for="floatingInput">Phone Number</label>
              </div>
              </div>
            </div>


            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="address" id="floatingInput" placeholder="Address" onChange={this.handleInputChange} value={this.state.address} required/>
                <label for="floatingInput">Address</label>
              </div>

            <div class="form-floating mb-3">
              <textarea id="floatingInput" name="details" style={{height: "100px"}} type="text"  class="form-control" placeholder="Details"  onChange={this.handleInputChange} value={this.state.details} required/>
              <label for="floatingInput">Details</label>
            </div>





            <div class="custom-file">
            <h5><label class="custom-file-label" for="customFileLangHTML">Image : </label></h5><br/>
            <FileBase64 type="file" class="custom-file-input" id="customFileLangHTML" name="image" multiple={ false } onDone={({ base64 }) => this.state({ image: base64 })} hidden required/>
            </div>

            <br/><br/>

            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block mb-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
  }
}