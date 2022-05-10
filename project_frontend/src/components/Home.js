import React, { Component } from 'react'

export default class Home extends Component {
    onRedirect(){
        window.location.href="/profile"
    }

  render() {
    return (
   <div className='container'>
       <h2>Home Page</h2>
       <button type="button" class="btn btn-primary mt-3" onClick={this.onRedirect}>Profile</button>
   </div>
    )
  }
}
