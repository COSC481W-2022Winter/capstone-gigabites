import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import CreateRecipe from './pages/createRecipe';

ReactSession.setStoreType('localStorage');
class App extends Component {
    render () {
        return (
            <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/passwordReset' element={<PasswordReset/>} />
                <Route path='/createRecipe' element={<CreateRecipe/>} />
            </Routes>
            </Router>
        );
    }
}
export default App;