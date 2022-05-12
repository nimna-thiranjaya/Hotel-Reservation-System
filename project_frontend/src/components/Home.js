import React, { Component } from 'react'
import Header from './Layouts/Header'


export default class Home extends Component {
    onRedirect(){
        window.location.href="/profile"
    }

  render() {
    return (
   <div>
      <Header/>
      <div className='container'>

      </div>
   </div>
    )
  }
}
