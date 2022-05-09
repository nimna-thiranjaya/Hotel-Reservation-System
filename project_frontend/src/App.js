import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/signup';
import Login from './components/DH_Components/login';


export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Signup} />
              <Route path ='/login' component={Login} />

            </Switch>
        </Router>
    )
  }
}