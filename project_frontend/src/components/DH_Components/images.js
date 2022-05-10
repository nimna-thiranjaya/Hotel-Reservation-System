import React, { Component } from 'react'
import axios from "axios";
import FileBase64 from 'react-file-base64';


export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      image:""
    }
}

handleInputChange = (e) => {
    const {name,value} = e.target;
    this.setState({
        ...this.state,
        [name]:value
    }) 
} 

onSubmit = (e) =>{

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  e.preventDefault();
      const {image} = this.state;
      const data = {image};
      console.log(data)

      if(data.image === undefined){
          alert("image is undefined");
      }else(
      axios.post(`http://localhost:8000/hotel/upload`,data,config)
      .then(res=>{
              alert("image uploaded")
              window.location.reload();
      }).catch((err)=>{
          alert(err)
      })
      )
}


  render() {
      return (
       
          <div>
              
              <form name="form" onSubmit={this.onSubmit}> 

                            <h1>Image</h1>
                            <div>
                                  <FileBase64 type="file" name="image" multiple={ false } onDone={({ base64 }) => this.setState({ image: base64 })}required/>
                            </div>

                             <br/>                   
                             <center><button type="submit">
                                     Add Image
                                 </button></center>
                             
              </form>     
                                              
          </div>     
        
  
      )
  
  }
  
  }