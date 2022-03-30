import React from "react";
import Navbar from '../components/Navbar';
import {  Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Alert from '@mui/material/Alert';

class Profile extends React.Component {
  render(){
    return (
      <div className="App">
        {/*Imports a material design style sheep using the Google API*/}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
     
        {/*Imports navbar to the top of the page*/}
        <Navbar />

        {/*If coming from Login page, display successfully logged in alert!  (Also resets ReactSession fromlogin variable)*/}
        {(ReactSession.get('fromlogin') === true) &&
        <div>
          <Alert severity="success">Successfully logged in!  Welcome back <strong>{ReactSession.get('username')}!</strong></Alert>
          {ReactSession.remove("fromlogin")}
        </div>
        }

        {/*If the user is logged in, display the profile page*/}
        {(ReactSession.get('username') !== undefined) &&
          <div>
            <br/><br/>
            <Link to="/following" className="followingfollows">Following: 0</Link>
            <Link to="/followers" className="followingfollows">Followers: 0</Link>
            <br/><br/>

            <div className="centered">
              <h1 className="textcenter">{ReactSession.get('username')}</h1>
            </div>

            <div className="centered">
              <h2>bio</h2>
              <p>{ReactSession.get('bio')}</p><br/>
            
            <img src={require('./user_images/' + ReactSession.get('picture'))} alt="blobjr"/>
              <br/><br/>
              <Link to="/recipe/create" className="profilebuttons">Create a Recipe</Link>
              <Link to="/editprofile" className="profilebuttons">Edit Profile</Link>
            </div>

            <br/><br/>

            <div className="borderProfile">
              <table className="normal">
              {(ReactSession.get('length') >= 1) &&
                <tr>
                  <a href={ReactSession.get('recipeName0path')}>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage0'))} alt="pic0"/>
                      </div>
                    </td>
                  </a>
                  <td>
                    <div className="centered">
                      <label className="labelCenter"><a href={ReactSession.get('recipeName0path')}>{ReactSession.get('recipeName0')}</a></label>
                    </div>
                  </td>
                </tr>}
 
                {(ReactSession.get('length') >= 2) &&
                <tr>
                  <a href={ReactSession.get('recipeName1path')}>
                    <td>
                      <div className="centered">
                      <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage1'))} alt="pic1"/>
                      </div>
                    </td>
                  </a>
                  <td>
                    <div className="centered">
                      <label className="labelCenter"><a href={ReactSession.get('recipeName1path')}>{ReactSession.get('recipeName1')}</a></label>
                    </div>
                  </td>
                </tr>}

                {(ReactSession.get('length') >= 3) &&
                <tr>
                  <a href={ReactSession.get('recipeName2path')}>
                    <td>
                      <div className="centered">
                      <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage2'))} alt="pic2"/>
                      </div>
                    </td>
                  </a>
                  <td>
                    <div className="centered">
                      <label className="labelCenter"><a href={ReactSession.get('recipeName2path')}>{ReactSession.get('recipeName2')}</a></label>
                    </div>
                  </td>
                </tr>}
                
                {(ReactSession.get('length') >= 4) &&
                <tr>
                  <a href={ReactSession.get('recipeName3path')}>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage3'))} alt="pic3"/>
                      </div>
                    </td>
                  </a>
                  <td>
                    <div className="centered">
                      <label className="labelCenter"><a href={ReactSession.get('recipeName3path')}>{ReactSession.get('recipeName3')}</a></label>
                    </div>
                  </td>
                </tr>}

                {(ReactSession.get('length') >= 5) &&
                <tr>
                  <a href={ReactSession.get('recipeName0path')}>
                    <td>
                      <div className="centered">
                        <img className="recipeimage" src={require('./recipe_images/' + ReactSession.get('recipeImage4'))} alt="pic4"/>
                      </div>
                    </td>
                  </a>
                  <td>
                    <div className="centered">
                      <label className="labelCenter"><a href={ReactSession.get('recipeName4path')}>{ReactSession.get('recipeName4')}</a></label>
                    </div>
                  </td>
                </tr>}
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