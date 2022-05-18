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
      <a href={`/payment/${"628379cb1fc5d5ada6a70695"}`}><button class="btn btn-secondary" style={{width: 100+"%"}}>Check Out</button></a>
      </div>
   </div>
    )
  }
}
