import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/NT_Components/traveler/Login';



export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Login} />

            </Switch>
        </Router>
    )
  }
}