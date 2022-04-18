import React from "react";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { serverAddress } = require('./config.json');

class forgotPassword extends React.Component {
	constructor(val) {
		super(val);
		this.state = {username: '', redirect: false};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	//Function executes whenever user changes the username textfield
	handleUsernameChange(event) {
	this.setState({username: event.target.value});
	}
	
	//Runs whenever user clicks the submit button to validate entries
	handleSubmit(event) {
		if(this.state.username ==='') 
		{
		  alert("Missing username! Please try again.")
		  return;
		}

		//Posts username to ensure their is an entry in the database, and sends email to user's saved email address based on username if valid entry
		axios.post(serverAddress+"emailReset", {
			username: this.state.username
		}).then((res) => {
		if(res.data === true){
			this.setState({redirect: true});
		}
		else  //Incorrect username/password information at this point
			alert ("Incorrect information  Please try again.");
		}).catch(() => {
			console.log('Error alert!');
		});
		event.preventDefault();
	}
	render(){
		if(this.state.redirect)
		{
			let finalURL = '../passwordReset';
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
				<Navbar />

				<form onSubmit={this.handleSubmit}>
					<div className="centeredForgotPassword">			
						<h1 className="textcenter">Welcome to the password reset page!</h1>
						<h3 className="textcenter"> Please enter your username below to have</h3><h3>a recovery code sent to your email</h3>

						<input className="passwordReset" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} required/>
						<br/>
						<input className="PassReset" type="submit" value="Submit"/>
					</div>
				</form>
			</div>
			);
		}
	}
};

export default forgotPassword;