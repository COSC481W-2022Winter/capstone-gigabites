import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import Navbar from '../components/Navbar';
const { editUser } = require('./config.json');
  


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

function validation()
{
  var password = document.getElementById("password").value;

  console.log(password);
  if(password.length < 1) { return true; }
  if(checkPassword(password)) 
  {
	return true;
  }
  else
  	return false;
}

 class EditProfile extends React.Component {
    constructor(val) {
        super(val);
        this.state =
		{
			username: ReactSession.get("username"),
			bio: ReactSession.get("bio"),
			profilePicture: '',
			email: ReactSession.get("email"),
			password: '' ,
			question:ReactSession.get("question"),
			answer: ReactSession.get("answer"),
		};	
   		this.handleBioChange = this.handleBioChange.bind(this);
    	this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
     	this.handleEmailChange = this.handleEmailChange.bind(this);
   		this.handlePasswordChange = this.handlePasswordChange.bind(this);
  		this.handleQuestionChange = this.handleQuestionChange.bind(this);
   		this.handleAnswerChange = this.handleAnswerChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    //Function to execute when user changes bio
    handleBioChange(event) {
		ReactSession.set("bio", event.target.value);
        this.setState({bio: event.target.value});
	}
	
	//Function to execute when user changes profile picture 
    handleProfilePictureChange(event) {
        this.setState({profilePicture: event.target.value});
    }

	//Function to execute when user changes email
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
			this.setState({password: event.target.value});
	}
	
	//Function to execute when user changes security question
    handleQuestionChange(event) {
        this.setState({question: event.target.value});
    }

	//Function to execute when user changes security question answer
    handleAnswerChange(event) {
        this.setState({answer: event.target.value});
    }

	//Function to execute when user submits changes 
	handleSubmit(event) {
		if(validation()==false){
			event.preventDefault();
		}
	}

    render(){
		return (
    		<div className="App">
		
				{/*Imports navbar to the top of the page*/}
				<Navbar />
				<div className="header">
					<h1>Edit Profile</h1>
				</div>
		
				<form ref='uploadForm' id='uploadForm' action={editUser} method='post' encType="multipart/form-data">
					<div className="centered">
							<img className="avatar" src={require('./user_images/' + ReactSession.get('profilePicture')) }alt="blob"/>
							<br/><br/>
					
					<input type="file" name="sampleFile" accept="image/png, image/jpeg"/> 
						
					</div><br/>
					<div className="border">
						<table className="editProf">
							<tbody>
								<tr>
									<td>
										<label className="user">{ReactSession.get('username')}</label>
										<textarea className="editBio" name="username" id='username' type="text" value={this.state.username} onChange={this.handleUsernameChange} hidden/>
									</td>
								</tr>

								<tr>
									<td>
										{/*Bio*/}
										<label className="editProf">Bio</label>
										<textarea className="editBio" name="bio" id='bio' maxLength="500" type="text" value={this.state.bio} onChange={this.handleBioChange} required/>
									</td>
								</tr>
								<tr>
									<td>
										{/*Email*/}
										<label className="editProf">Email</label>
										<input className="editProf" name="email" id='email' type="text" value={this.state.email} onChange={this.handleEmailChange} required/>
									</td>
								</tr>
								<tr>
									<td>
										{/*Security Question*/}  
										<label className="editProf">Security Question </label>
										<input className="editProf" name="question" id='question' type="text" value={this.state.question} onChange={this.handleQuestionChange} required/>
									</td>
								</tr>
								<tr>
									<td>
										{/*Security Answer*/}
										<label className="editProf">Security Question Answer </label>
										<input className="editProf" name="answer" id='answer' type="text" value={this.state.answer} onChange={this.handleAnswerChange}/>
									</td>
								</tr>
								<tr>
									<td>
										{/*Password*/}
										<label className="editProf">Password</label>
										<input className="editProf" name="password" id='password' type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
									</td>
								</tr>
							</tbody>
						</table>
						<button onClick={this.handleSubmit} className="btn" type="submit">Save Changes</button>
					</div>
				</form>
			</div>
        )}  
	}
export default EditProfile;