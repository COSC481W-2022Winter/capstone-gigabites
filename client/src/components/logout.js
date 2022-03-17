
import React from 'react';
import { ReactSession } from 'react-client-session';
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import "../App.css";

ReactSession.setStoreType('localStorage');

const buttonStyle = styled.li;
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
            <buttonStyle>
                { this.state.redir  ? (<Navigate  to="../" />) : null }
                <input className="logout" type="submit" value="Logout" onClick={this.LogoutClick.bind(this)} />
            </buttonStyle>

        )
    }
}
export default logout