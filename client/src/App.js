import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

//Imports pages to allow BrowserRouter to access them
import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import EditProfile from './pages/editProfile';
import EditProfileTransition from './pages/EditProfileTransition';
import SearchResults from './pages/searchResults';
import CreateRecipe from './pages/createRecipe';
import Recipe from './pages/recipe';
import Followers from './pages/followers';
import Following from './pages/following';
import IngredientSearch from './pages/ingredientSearch';
import LoggedOut from './pages/loggedout';
import RecipeRedirect from './pages/recipeRedirect';
import AboutUs from './pages/About-Us';

//Sets storage type for session variables
ReactSession.setStoreType('localStorage');

/*Updates profile page URL based on users username*/
function User() {
    return ReactSession.get('username');
  }

/*Updates recipe page URL based on the RecipeID of the recipe*/ 
function RecipeID() {
    return ReactSession.get('RecipeID');
}

class App extends Component {
    render () {
        return (
            <Router>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/signup' element={<SignUp/>} />
                    <Route path='/profile/:username' component={User} element={<Profile/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/passwordReset' element={<PasswordReset/>} />
                    <Route path='/searchResults' element={<SearchResults/>} />
                    <Route path='/recipe/create' element={<CreateRecipe/>} />
                    <Route path='/recipe/:RecipeID' component={RecipeID} element={<Recipe/>} />
                    <Route path='/followers' element={<Followers/>} />
                    <Route path='/following' element={<Following/>} />
                    <Route path='/editProfile' element={<EditProfile/>} />
                    <Route path='/editProfileTransition' element={<EditProfileTransition/>} />
                    <Route path='/loggedout' element={<LoggedOut/>} />
                    <Route path='/ingredientSearch' element={<IngredientSearch/>} />
                    <Route path='/recipeRedirect' element={<RecipeRedirect/>} />
                    <Route path='/About-Us' element={<AboutUs/>} />
                </Routes>
            </Router>
        );
    }
}
export default App;