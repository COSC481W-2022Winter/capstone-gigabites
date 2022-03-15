import React from 'react';
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
import Alert from '@mui/material/Alert';
class Profile extends React.Component {
  render(){
    return (
      <div>
        {/*Imports a material design style sheep using the Google API*/}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        
        {/*Imports navbar to the top of the page*/}
        <Navbar />
        
        {/*If the user is logged in, display the profile page*/}
        {(ReactSession.get('username') !== undefined) &&
          <h1>This is the profile page</h1>
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