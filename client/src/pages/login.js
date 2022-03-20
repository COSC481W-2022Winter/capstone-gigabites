import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
const { passwordCompare } = require('./config.json');


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
        this.setState({redirect: true});
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
      return(
        <div>
          {alert('Successfully logged in!')}
          <Navigate to="../profile" />
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
            <h3>Welcome Back</h3>
          </div>

          <div className="border">
            {/* On submit, validate username and password and compare user entry to records in database */}
            <form onSubmit={this.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {/*Username*/}
                      <label className="label">Username</label>
                      <input type="text" id='username' value={this.state.username} onChange={this.handleUsernameChange}/>
                    </td>
                  </tr>
                </tbody>

                <tbody>
                <tr>
                  <td>
                      {/*Password*/}
                      <label className="label">Password</label>
                      <input type="password" id='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                    </td>
                  </tr>
                </tbody>
              </table>
          
              <button type="submit" value="Login" className="btn"> Login </button>
              <Link to="/resetPassword" className="btn">Forgot Password</Link>
            </form>
          </div>
        </div>
      )
    }
  }
}
export default Login;