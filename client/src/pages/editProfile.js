import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom';
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
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
   		this.handleBioChange = this.handleBioChange.bind(this);
    	this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
     	this.handleEmailChange = this.handleEmailChange.bind(this);
   		this.handlePasswordChange = this.handlePasswordChange.bind(this);
  		this.handleQuestionChange = this.handleQuestionChange.bind(this);
   		this.handleAnswerChange = this.handleAnswerChange.bind(this);
	}

	//Function to execute when user changes bio
	handleUsernameChange(event) {
		this.setState({username: event.target.value});
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

	// //Function to execute when user submits changes 
	// handleSubmit(event) {
	// //const editUsers = () => {
	// 	axios.post(`${editUser}`, {
	// 		username: this.state.username,
    //         bio: this.state.bio,
	// 		profilePicture: this.state.profilePicture,
    //         email: this.state.email,
    //         password: this.state.password,
    //         question: this.state.question,
    //         answer: this.state.answer
	// 	}).then(res => console.log(res))
	// 	.catch(err => {
	// 			console.log(err);
	// 			alert("There was an error updating your profile");
	// 		});
	// 		ReactSession.set("fromEditProfile", true);
	// 		this.setState({redirect: true});
	// 	//}
	//   }

    render(){
        //Redirect to profile page
        if(this.state.redirect)
		{
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
		
				{/*Imports navbar to the top of the page*/}
				<Navbar />
				<div className="header">
					<h1>{ReactSession.get('username')}: Edit Profile</h1>
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
										{/*Username which doesn't actually appear on page.. SHHHH*/}
										<textarea className="editBio" name="username" id='username' maxLength="500" type="text" value={this.state.username} onChange={this.handleUsernameChange} hidden/>
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
						<button className="btn" type="submit">Save Changes</button>
					</div>
				</form>
			</div>
        )}  
	}
}
export default EditProfile;