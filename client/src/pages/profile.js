import React from "react";
import Navbar from '../components/Navbar';
import {  Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Alert from '@mui/material/Alert';
import "../App.css";

class Profile extends React.Component {

  handleClick = (id, path) => {
  ReactSession.set("Number",id);
  window.location.href = path;
  console.log(this);
  console.log();
  }

  render(){
    return (
      <div className="App">
     
        {/*Imports navbar to the top of the page*/}
        <Navbar />

        {/*If coming from Login page, display successfully logged in alert!  (Also resets ReactSession fromlogin variable)*/}
        {(ReactSession.get('fromlogin') === true) &&
        <div>
          <Alert severity="success">Successfully logged in!  Welcome back <strong>{ReactSession.get('username')}!</strong></Alert>
          {ReactSession.remove("fromlogin")}
        </div>
        }

        {/*If coming from edit profile page, display successfully updated in alert!  (Also resets ReactSession fromlogin variable)*/}
        {(ReactSession.get('fromEditProfile') === true) &&
        <div>
          <Alert severity="success">Successfully updated your profile!</Alert>
          {ReactSession.remove("fromEditProfile")}
        </div>
        }

        {/*If the user is logged in, display the profile page*/}
        {(ReactSession.get('username') !== undefined) &&
          <div>
            <br/>
            <Link to="/following" className="followingfollows">Following: 0</Link>
            <Link to="/followers" className="followingfollows">Followers: 0</Link>
            <br/><br/>

            <h1 className="UsernameHeader">{ReactSession.get('username')}</h1>

            <div className="centered">
              <h2 className="bio">bio</h2>
              <p className="bio">{ReactSession.get('bio')}</p><br/>
            
            <img className="profileImage" src={require('./user_images/' + ReactSession.get('profilePicture'))} alt="blobjr"/>

              <br/><br/>
              <Link to="/recipe/create" className="profilebuttons">Create a Recipe</Link>
              <Link to="/editprofile" className="profilebuttons">Edit Profile</Link>
            </div>

            <br/><br/>
              <h2 className="YourRecipes">Your Recipes:</h2>
            <div className="borderProfile">
            <table className="normal">

            {(ReactSession.get('length') === 0) &&
              <h2>No recipes yet!</h2>
            }

              {(ReactSession.get('length') >= 1) &&
              <tbody>
                <tr>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage0'))} alt="pic0"/>
                      </div>
                    </td>
                  <td>
                    <div className="centered">
                      <button className="profilebuttons" onClick={() => this.handleClick(0,ReactSession.get('recipeName0path'))}>{ReactSession.get('recipeName0')}</button>
                    </div>
                  </td>
                </tr>
                </tbody>}
 
                {(ReactSession.get('length') >= 2) &&
                <tbody>
                <tr>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage1'))} alt="pic1"/>
                      </div>
                    </td>
                  <td>
                    <div className="centered">
                     <button className="profilebuttons" onClick={() => this.handleClick(1,ReactSession.get('recipeName1path'))}>{ReactSession.get('recipeName1')}</button>
                    </div>
                  </td>
                </tr>
                </tbody>}

                {(ReactSession.get('length') >= 3) &&
                <tbody>
                <tr>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage2'))}  alt="pic2"/>
                      </div>
                    </td>
                  <td>
                    <div className="centered">
                      <button className="profilebuttons" onClick={() => this.handleClick(2,ReactSession.get('recipeName2path'))}>{ReactSession.get('recipeName2')}</button>
                    </div>
                  </td>
                </tr>
                </tbody>}
                
                {(ReactSession.get('length') >= 4) &&
                <tbody>
                <tr>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage3'))} alt="pic3"/>
                      </div>
                    </td>
                  <td>
                    <div className="centered">
                      <button className="profilebuttons"onClick={() => this.handleClick(3,ReactSession.get('recipeName3path'))}>{ReactSession.get('recipeName3')}</button>
                    </div>
                  </td>
                </tr>
                </tbody>}

                {(ReactSession.get('length') >= 5) &&
                <tbody>
                <tr>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage4'))} alt="pic4"/>
                      </div>
                    </td>
                  <td>
                    <div className="centered">
                      <button className="profilebuttons" onClick={() => this.handleClick(4,ReactSession.get('recipeName4path'))}>{ReactSession.get('recipeName4')}</button>
                    </div>
                  </td>
                </tr>
                </tbody>}
                
              </table>
            </div>
          </div>
        }

        

        {/*If the user is not logged in, display a simplistic profile page with an alert saying you must be logged in*/}
        {(ReactSession.get('username') === undefined) &&
          <div>
            {/*Warning Material Design alert.  Please see
            https://mui.com/components/alert/#main-content for more documentation/information*/}
            
            <Alert severity="error">You need to login to view profile!</Alert>
          </div>
        }
      </div>
    );
  };
};

export default Profile;