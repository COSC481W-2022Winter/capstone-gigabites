
import React from 'react';
import { ReactSession } from 'react-client-session';
import { Navigate } from "react-router-dom";
import "../App.css";

ReactSession.setStoreType('localStorage');

class logout extends React.Component {
    constructor(props) {
      super(props);
      this.state = { redir: false };
    }

    //Removes username from session variables... Effectively logging user out
    LogoutClick() {
        alert('You logged out!');
        ReactSession.remove("username");
        this.setState({redir: true});
    }

    render(){
        return(
           //Creates the logout button object and styles it to the right side of the navbar
            <li className="right">
                { this.state.redir  ? (<Navigate  to="../loggedout" />) : null }
                <input className="logout" type="submit" value="Logout" onClick={this.LogoutClick.bind(this)} />
            </li>

        )
    }
}
export default logout