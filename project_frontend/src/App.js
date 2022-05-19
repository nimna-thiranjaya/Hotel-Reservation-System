import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/signup';
import Login from './components/DH_Components/login';
import Profile from './components/DH_Components/profile';
import UpdateProfile from './components/DH_Components/updateProfile';
import AddRooms from './components/DH_Components/addroom';
import RoomUpdate from './components/DH_Components/roomUpdate';

export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/aa' component={Signup} />
              <Route path ='/login' component={Login} />
              <Route path ='/profile' component={Profile} />
              <Route path ='/update' component={UpdateProfile} />
              <Route path ='/addRoom' component={AddRooms} />
              <Route path ='/updateRoom/:id' component={RoomUpdate} />

            </Switch>
        </Router>
    )
  }
}