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
      <div className='content'>
      <a href='/payment'><button class="btn btn-secondary" style={{width: 100+"%"}}>Check Out</button></a>
      </div>
   </div>
    )
  }
}
