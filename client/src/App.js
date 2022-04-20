import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

//Imports pages to allow BrowserRouter to access them
import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import ForgotPassword from './pages/forgotPassword';
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
import EditRecipe from './pages/editRecipe';
import ExplorePage from './pages/explore';
import SearchResult from './pages/searchResult';


//Sets storage type for session variables
ReactSession.setStoreType('localStorage');

/*Updates profile page URL based on users username*/
function User() {
    return ReactSession.get('username');
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
                    <Route path='/forgotPassword' element={<ForgotPassword/>} />
                    <Route path='/searchResults' element={<SearchResults/>} />
                    <Route path='/recipe/create' element={<CreateRecipe/>} />
                    <Route path='/recipe/:RecipeID' element={<Recipe/>} />
                    <Route path='/followers' element={<Followers/>} />
                    <Route path='/following' element={<Following/>} />
                    <Route path='/editProfile' element={<EditProfile/>} />
                    <Route path='/editProfileTransition' element={<EditProfileTransition/>} />
                    <Route path='/loggedout' element={<LoggedOut/>} />
                    <Route path='/ingredientSearch' element={<IngredientSearch/>} />
                    <Route path='/recipeRedirect' element={<RecipeRedirect/>} />
                    <Route path='/About-Us' element={<AboutUs/>} />
                    <Route path='/recipe/edit/:RecipeID' element={<EditRecipe/>} />
                    <Route path='/explore' element={<ExplorePage/>} />
                    <Route path='/searchResult' element={<SearchResult/>} />
                </Routes>
            </Router>
        );
    }
}
export default App;