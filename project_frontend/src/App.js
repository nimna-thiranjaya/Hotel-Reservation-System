import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Sample from './components/DH_Components/sample';


export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Sample} />

            </Switch>
        </Router>
    )
  }
}