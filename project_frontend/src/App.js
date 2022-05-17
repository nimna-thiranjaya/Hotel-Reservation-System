import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ShowHotels from './components/RS_Components/ShowHotels';
import ShowRooms from './components/RS_Components/ShowRooms';










export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              
              <Route path = "/hotels"  component = {ShowHotels}/>
              <Route path = "/hotel/:_id"  component = {ShowRooms}/>
         
              
              
            </Switch>
        </Router>
    )
  }
}




 
      

       
       
      







