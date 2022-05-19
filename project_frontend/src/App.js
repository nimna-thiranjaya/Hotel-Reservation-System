import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginN from './components/NT_Components/traveler/Login';
import ProfileN from './components/NT_Components/traveler/Profile';
import TravelerRegister from './components/NT_Components/traveler/TravelerRegister';
import TravelerUpdate from './components/NT_Components/traveler/TravelerUpdate';
import Payment from './components/NT_Components/payment/Payment';


import ShowHotels from './components/RS_Components/ShowHotels';
import ShowRooms from './components/RS_Components/ShowRooms';
import ShowReservation from './components/RS_Components/ShowReservation';
import ShowAmount from './components/RS_Components/ShowAmount';


import Signup from './components/DH_Components/signup';
import Login from './components/DH_Components/login';
import Profile from './components/DH_Components/profile';
import UpdateProfile from './components/DH_Components/updateProfile';
import AddRooms from './components/DH_Components/addroom';
import RoomUpdate from './components/DH_Components/roomUpdate';

toast.configure();
function App() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={LoginN} exact/>
              <Route path ='/register' component={TravelerRegister} />
              <Route path ='/profile' component={ProfileN} />
              <Route path ='/update' component={TravelerUpdate} />
              <Route path ='/payment/:id' component={Payment} />
              


              <Route path ='/aa' component={Signup} />
              <Route path ='/login' component={Login} />
              <Route path ='/profileD' component={Profile} />
              <Route path ='/updateD' component={UpdateProfile} />
              <Route path ='/addRoom' component={AddRooms} />
              <Route path ='/updateRoom/:id' component={RoomUpdate} />


              <Route path = "/home"  component = {ShowHotels}/>
              <Route path = "/hotel/:_id"  component = {ShowRooms}/>
              <Route path = "/show"  component = {ShowReservation}/>
              <Route path = "/checkout/:id"  component = {ShowAmount}/>


            </Switch>
        </Router>
    )
}
export default App;