import React from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
import {  Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from 'axios';
const {getRecipe} = require('./config.json');

var Recipe0;
var Recipe1;
var Recipe2;
var Recipe3;
var Recipe4;

function get()
{
  //Compares password to the hashed one in the database
  console.log(ReactSession.get('username'));
  axios.post(`${getRecipe}`, {
    username: ReactSession.get('username'),
  }).then((res) => {
    if(res.data === false)
      console.data("False reply from database on profile page");
    else{
      console.log(res.data);
      console.log('0: '+res.data[0].name);
      console.log('1: '+res.data[1].name);
      Recipe0=res.data[0].name;
      Recipe1=res.data[1].name;
      // Recipe2=res.data[2].name
      // Recipe3=res.data[3].name
      // Recipe4=res.data[4].name
      
    }
  }).catch(() => {
    console.log('Error alert! Profile.js');
  });
}


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
          <div className="centered">
            
            <br/><br/>
            <h1 className="textcenter">{ReactSession.get('username')}</h1>
            <buttonStyle>
              <Link to="/following" className="followingfollows">Following: 0</Link>
            </buttonStyle>
              <br/><br/>
            <buttonStyle>
              <Link to="/followers" className="followingfollows">Followers: 0</Link>
            </buttonStyle>
            <Link to="/recipe/create" className="profilebuttons">Create a Recipe</Link>
            <Link to="/editprofile" className="profilebuttons">Edit Profile</Link>
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