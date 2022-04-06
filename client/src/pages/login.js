import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
const { passwordCompare, getUser, getRecipe } = require('./config.json');

function getUserInfo()
{
  //Compares password to the hashed one in the database
  axios.post(`${getUser}`, {
    username: ReactSession.get('username'),
  }).then((res) => {
    if(res.data === false)
      console.data("False reply from database");
    else{
      ReactSession.set("bio", res.data.bio);
      ReactSession.set("email", res.data.email);
      ReactSession.set("question", res.data.question);
      ReactSession.set("answer", res.data.answer);
      ReactSession.set("profilePicture", res.data.profilePicture+"."+res.data.profilePictureEXT);
    }
  }).catch(() => {
    console.log('Error alert! Login.js');
  });
}

//Gets a list of recipes from the backend based on the logged in users username
function getRecipesByUsername()
{
  axios.post(`${getRecipe}`, {
    username: ReactSession.get('username'),
  }).then((res) => {
    if(res.data === false)
      console.data("False reply from database on profile page");
    else{
      ReactSession.set("length",res.data.length);
      for(var i = 0; i < ReactSession.get('length'); i++)
      {
        ReactSession.set("recipeID"+i,res.data[i]._id);
        ReactSession.set("recipeName"+i,res.data[i].name);
        ReactSession.set("recipeImage"+i, res.data[i].recipePicture+"."+res.data[i].recipePictureEXT);
        ReactSession.set("recipeName"+i+"path","../../recipe/"+res.data[i]._id);
        ReactSession.set("recipeDescription"+i, res.data[i].description);
        ReactSession.set("recipeDirections"+i,res.data[i].directions);
        ReactSession.set("recipeServingSize"+i,res.data[i].servingsize);
        ReactSession.set("recipeTotalTime"+i,res.data[i].totaltime);
        ReactSession.set("recipePrepTime"+i,res.data[i].preptime);
        ReactSession.set("recipeBakingTime"+i,res.data[i].bakingtime);
        ReactSession.set("recipeCookTime"+i,res.data[i].cooktime);
        ReactSession.set("recipePrepTimeUnits"+i,res.data[i].preptimeunit);
        ReactSession.set("recipeCookTimeUnits"+i,res.data[i].cooktimeunit);
        ReactSession.set("recipeBakingTimeUnits"+i,res.data[i].bakingtimeunit);
        ReactSession.set("amountPerServing"+i,res.data[i].amountperserving);
        ReactSession.set("amountPerServingUnits"+i,res.data[i].amountperservingunit);
      }
    }
  }).catch(() => {
    console.log('Error alert! Login.js');
  });
}

class Login extends React.Component {
  constructor(val) {
    super(val);
    this.state = {username: '', password: '', redirect: false};
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Function executes whenever user changes the username textfield
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  //Function executes whenever user changes the password textfield
  handlePasswordChange(event) {
   this.setState({password: event.target.value});
  }

  //Runs whenever user clicks the submit button to validate entries
  handleSubmit(event) {
    if(this.state.username ==='' || this.state.password === '') {
      alert("Missing username or password! Please try again.")
      return;
    }

    //Compares password to the hashed one in the database
    axios.post(`${passwordCompare}`, {
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      if(res.data === true){
        ReactSession.set("username", this.state.username);
        ReactSession.set("fromlogin", true);
        getUserInfo();
        getRecipesByUsername();
        setTimeout(() => { this.setState({redirect: true}); }, 1000);
      }
      else  //Incorrect username/password information
        alert ("Incorrect username or password!  Please try again.");
    }).catch(() => {
      console.log('Error alert!');
    });
    event.preventDefault();
  }
  render(){
    //Alerts user of successful login, and redirects to user profile
    if(this.state.redirect){
      /*Updates profile page URL based on users username*/
      let finalURL = '../profile/'+ReactSession.get('username');
      return(
        <div>
          <Navigate to={finalURL} />
        </div>
      );
    }
    else
    {
      return (
        <div className="App">
          	{/*Imports navbar to the top of the page*/}
          	<Navbar />
          <div className="header">
            <h1>Login</h1>
            <h3 className="italic">Welcome Back</h3>
          </div>
            <div className="border">
              {/* On submit, validate username and password and compare user entry to records in database */}
              <form onSubmit={this.handleSubmit}>
                <table className="normal">
                  <tbody>
                    <tr>
                      <td>
                        <div className="centered">
                          {/*Username*/}
                          <label className="label">Username</label>
                          <input type="text" className="textbox" id='username' value={this.state.username} onChange={this.handleUsernameChange}/>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tbody>
                  <tr>
                    <td>
                      <div className="centered">
                          {/*Password*/}
                          <label className="label">Password</label>
                          <input type="password" className="textbox" id='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
            
                <button type="submit" value="Login" className="btn"> Login </button>
                <Link to="/passwordReset" className="forgotpass">Forgot Password</Link>
              </form>
          </div>
        </div>
      )
    }
  }
}
export default Login;