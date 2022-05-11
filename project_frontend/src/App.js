import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import reservation from './components/RS_Components/reservation';


export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              
              <Route path ='resrv' Component = {reservation}/>

            </Switch>
        </Router>
    )
  }
}








