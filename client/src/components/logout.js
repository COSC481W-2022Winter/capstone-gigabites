
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

    LogoutClick() {
        alert('You logged out!');
        ReactSession.remove("username");
        this.setState({redir: true});
        
    }

    render(){
        return(
           
        <li className="right">
             { this.state.redir  ? (<Navigate  to="../" />) : null }
            <input type="submit" value="Logout" onClick={this.LogoutClick.bind(this)} />
        </li>
        )
    }
}
export default logout