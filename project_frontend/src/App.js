import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/signup';
import Login from './components/DH_Components/login';
import Profile from './components/DH_Components/profile';
import Images from './components/DH_Components/images';

export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/aa' component={Signup} />
              <Route path ='/login' component={Login} />
              <Route path ='/profile' component={Profile} />
              <Route path ='/images' component={Images} />
            </Switch>
        </Router>
    )
  }
}