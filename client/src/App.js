import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import EditProfile from './pages/editProfile';
import SeacrhResults from './pages/searchResults';
import Recipe from './pages/recipe';
import Followers from './pages/followers';
import Following from './pages/following';
import IngredientSearch from './pages/ingredientSearch';


ReactSession.setStoreType('localStorage');
class App extends Component {
    render () {
        return (
            <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/passwordReset' element={<PasswordReset/>} />
                <Route path='/seacrhResults' element={<SeacrhResults/>} />
                <Route path='/recipe' element={<Recipe/>} />
                <Route path='/followers' element={<Followers/>} />
                <Route path='/following' element={<Following/>} />
                <Route path='/editProfile' element={<EditProfile/>} />
                <Route path='/ingredientSearch' element={<IngredientSearch/>} />
            </Routes>
            </Router>
        );
    }
}
export default App;