import React from "react";
import Navbar from '../components/Navbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { serverAddress } = require('./config.json');


function myFunction() {
	var x = document.getElementById("password");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}

function checkPassword(password)
{ // eslint-disable-next-line
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?~]/;
	const upperChar = /[A-Z]/;
	const lowerChar = /[a-z]/;
	const number = /\d/;

	if(password.length >= 8)  //Checks for a password with a minimum with 8 characters in string length
	{
		if(specialChars.test(password))  //Checks for special characters in the password field
		{
		if(upperChar.test(password))  //Checks for uppercase letters in the password field
		{
			if(lowerChar.test(password))  //Checks for lowercase letters in the password field
			{
				if(number.test(password))  //Checks for numbers in the password field
				{
					return true;
				} else invalidPassword(4);
			} else invalidPassword(3);
		} else invalidPassword(2);
		} else invalidPassword(1);
	} else invalidPassword(0);
}
  
function invalidPassword(param)
{
	switch(param)
	{
		case 0:   //Less than 8 characters
			alert('⛔️ Your password must be a minimum of 8 characters or more!');
			break;
		case 1:   //No special characters
			alert('⛔️ Password MUST contain special characters');
			break;
		case 2:   //No uppercase letters
			alert('⛔️ Password MUST contain uppercase letters');
			break;
		case 3:   //No lowercase letters
			alert('⛔️ Password MUST contain lowercase letters');
			break;
		case 4:   //No numbers
			alert('⛔️ Password MUST contain numbers');
			break;
		default:
			return false;
	}
	return false;
}
  
  
class PasswordReset extends React.Component {
	constructor(val) {
		super(val);
		this.state = {username: '', password: '', recoveryCode: '', redirect: false};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRecoveryCodeChange = this.handleRecoveryCodeChange.bind(this);
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
	//Function executes whenever user changes the recoveryCode textfield
	handleRecoveryCodeChange(event) {
	this.setState({recoveryCode: event.target.value});
	}
	
	//Runs whenever user clicks the submit button to validate entries
	handleSubmit(event) {
		if(this.state.username ==='' || this.state.password === '' || this.state.recoveryCode === '') {
		  alert("Missing information! Please try again.")
		  return;
		}
		else if(checkPassword(this.state.password))
		{
			axios.post(serverAddress+"passwordResetBackend", {
				username: this.state.username,
				password: this.state.password,
				recoveryCode: this.state.recoveryCode
			}).then((res) => {
			if(res.data === true){
				this.setState({redirect: true});
			}
			else  //Incorrect information
				alert ("Incorrect information  Please try again.");
			}).catch(() => {
			console.log('Error alert!');
			});
		}
		event.preventDefault();
	}
	  render(){
		if(this.state.redirect)
		{
		  let finalURL = '../login';
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
					<Alert severity="success">Email sent!  Be sure to check your spam folder!</Alert>
					<form onSubmit={this.handleSubmit}>
						<div className="centeredForgotPassword">
							<h3 className="textcenter">Please fill out the following information to change your password</h3>
							<input className="passwordReset" id="username" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} required/>
							<br/>
							<input className="passwordReset" id="recoveryCode" name="recoveryCode" type="text" placeholder="RecoveryCode" value={this.state.recoveryCode} onChange={this.handleRecoveryCodeChange} required/>
							<br/>
							<input className="passwordReset" id="password" name="password" type="password" placeholder="NewPassword" value={this.state.password} onChange={this.handlePasswordChange} required/>
							<br/>
							<input type="checkbox" onClick={() => myFunction()}/>Show Password

							<input className="PassReset" type="submit" value="Submit"/>
						</div>
					</form>
				</div>
			);
		}
	};
}

export default PasswordReset;