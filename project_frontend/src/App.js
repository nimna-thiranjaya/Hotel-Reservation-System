import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ShowHotels from './components/RS_Components/ShowHotels';
import ShowRooms from './components/RS_Components/ShowRooms';
import Login from './components/NT_Components/traveler/Login';
import ShowReservation from './components/RS_Components/ShowReservation';
import ShowAmount from './components/RS_Components/ShowAmount';








export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              
              <Route path = "/home"  component = {ShowHotels}/>
              <Route path = "/hotel/:_id"  component = {ShowRooms}/>
              <Route path = "/login"  component = {Login}/>
              <Route path = "/show"  component = {ShowReservation}/>
              <Route path = "/checkout/:id"  component = {ShowAmount}/>
             
         
              
              
            </Switch>
        </Router>
    )
  }
}




 
      

       
       
      







