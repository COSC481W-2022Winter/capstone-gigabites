import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
const { editUser } = require('./config.json');

  
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
			redirect: false
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

	//Function to execute when user changes paswword
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
	//const editUsers = () => {
		axios.post(`${editUser}`, {
			username: this.state.username,
            bio: this.state.bio,
			profilePicture: this.state.profilePicture,
            email: this.state.email,
            password: this.state.password,
            question: this.state.question,
            answer: this.state.answer
		}).then(res => console.log(res))
		.catch(err => {
				console.log(err);
				alert("There was an error updating your profile");
			});
			ReactSession.set("fromEditProfile", true);
			this.setState({redirect: true});
		//}
	  }

    render(){
        //Redirect to profile page
        if(this.state.redirect){
			ReactSession.set("bio", this.state.bio);

			if(this.state.profilePicture !== ''){
				ReactSession.set("profilePicture", this.state.profilePicture);
			}

            let finalURL = '../profile/'+ReactSession.get('username');
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
			{/*Imports a material design style sheet using the Google API*/}
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
	
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<div className="header">
				<h1>Edit Profile</h1>
			</div>
			<div className="centered">
					<img className="avatar" src={require('./user_images/' + ReactSession.get('profilePicture')) }alt="blob"/>
					<br/><br/>
					<label className="custom-file-upload">
						<input className="editProfile" name="sampleFile" type="file" id="image" value={this.state.profilePicture} onChange={this.handleProfilePictureChange}  accept="image/png, image/jpeg, image/gif" alt="blobjr"/>
					Change Profile Picture</label>
			</div><br/>
			<div className="border">
				<form onSubmit={this.handleSubmit}>
					<table className="editProf">
						<tbody>
							<tr>
								<td>
									{/*Bio*/}
									<label className="editProf">Bio</label>
									<textarea className="editBio" id='bio' maxLength="500" type="text" value={this.state.bio} onChange={this.handleBioChange} required/>
								</td>
							</tr>
							<tr>
								<td>
									{/*Email*/}
									<label className="editProf">Email</label>
									<input className="editProf" id='email' type="text" value={this.state.email} onChange={this.handleEmailChange} required/>
								</td>
							</tr>
							<tr>
								<td>
									{/*Security Question*/}  
									<label className="editProf">Security Question </label>
									<input className="editProf" id='question' type="text" value={this.state.question} onChange={this.handleQuestionChange} required/>
								</td>
							</tr>
							<tr>
								<td>
									{/*Security Answer*/}
									<label className="editProf">Security Question Answer </label>
									<input className="editProf" id='answer' type="text" value={this.state.answer} onChange={this.handleAnswerChange}/>
								</td>
							</tr>
							<tr>
								<td>
									{/*Password*/}
									<label className="editProf">Password</label>
									<input className="editProf" id='password' type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
								</td>
							</tr>
						</tbody>
					</table>
					<button type="submit" value="Save Changes" className="btn">Save Changes</button>
				</form>
			</div>
    	</div>
        )  
    }
}
}
export default EditProfile;