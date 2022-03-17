import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

//Imports pages to allow BrowserRouter to access them
import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';

//Sets storage type for session variables
ReactSession.setStoreType('localStorage');

class App extends Component {
    render () {
        return (
            <Router>
                {/*Adds routes to individual pages using BrowserRouter*/}
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/signup' element={<SignUp/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/passwordReset' element={<PasswordReset/>} />
                </Routes>
            </Router>
        );
    }
}
export default App;