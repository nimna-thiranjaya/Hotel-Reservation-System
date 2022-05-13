import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/NT_Components/traveler/Login';
import Home from './components/Home';
import Profile from './components/NT_Components/traveler/Profile';
import TravelerRegister from './components/NT_Components/traveler/TravelerRegister';
import TravelerUpdate from './components/NT_Components/traveler/TravelerUpdate';
import Payment from './components/NT_Components/payment/Payment';

export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Login} exact/>
              <Route path ='/home' component={Home} />
              <Route path ='/register' component={TravelerRegister} />
              <Route path ='/profile' component={Profile} />
              <Route path ='/update' component={TravelerUpdate} />
              <Route path ='/payment' component={Payment} />

            </Switch>
        </Router>
    )
  }
}