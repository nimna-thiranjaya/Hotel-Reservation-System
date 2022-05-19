import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/NT_Components/traveler/Login';
import Profile from './components/NT_Components/traveler/Profile';
import TravelerRegister from './components/NT_Components/traveler/TravelerRegister';
import TravelerUpdate from './components/NT_Components/traveler/TravelerUpdate';
import Payment from './components/NT_Components/payment/Payment';

toast.configure();
function App() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Login} exact/>
                <Route path ='/register' component={TravelerRegister} />
              <Route path ='/profile' component={Profile} />
              <Route path ='/update' component={TravelerUpdate} />
              <Route path ='/payment/:id' component={Payment} />

            </Switch>
        </Router>
    )
}
export default App;