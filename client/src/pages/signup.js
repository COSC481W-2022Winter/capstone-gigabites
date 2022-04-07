//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo
import "../App.css";
import React from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const {serverAddress } = require('./config.json');

function checkEmail(email)
{
  const at = /[@]/;
  const dot = /[.]/;

  if(at.test(email) && dot.test(email))
  {
    return true;
  }
  else
  {
   invalidPassword(5); 
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
    case 5:    //Invalid Email
      alert('You must enter a valid email address!');
      break;
    default:
      return false;
  }
  return false;
}

class SignUp extends React.Component{
  constructor(val) {
    super(val);
    this.state = {name: '', username: '', email: '', password: '', question: '', answer: '', redirect: false};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Function executes whenever user changes the username textfield
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  //Function executes whenever user changes the username textfield
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  //Function executes whenever user changes the email textfield
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  //Function executes whenever user changes the password textfield
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  //Function executes whenever user changes the question textfield
  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  }
  //Function executes whenever user changes the answer textfield
  handleAnswerChange(event) {
    this.setState({answer: event.target.value});
  }
  handleSubmit(event) {
    if(this.state.name ==='' || this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.question === '' || this.state.answer === '') {
      alert("Missing some information! Please try again.");
      return;
    }
    else if(checkPassword(this.state.password) && checkEmail(this.state.email))
    {
      //Compares password to the hashed one in the database
      axios.post((serverAddress+"createUser"), {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        question: this.state.question,
        answer: this.state.answer
      }).then((res) => {
        if(res.data === true) {
          console.log('Signup successful!');
          alert("Signup successful!");
          setTimeout(() => { this.setState({redirect: true}); }, 500);
        }
        else if(res.data === false) {
          console.log("Username already taken!  Please try another username!");
          alert ("Username already taken!  Please try another username!");
        }
      });
    }
    event.preventDefault();
  }
  render(){
    if(this.state.redirect){
      return(
        <div>
          <Navigate to='../' />
        </div>
      );
    }
    else{
      return ( 
          <form onSubmit={this.handleSubmit}>
            {/*Imports navbar to the top of the page*/}
            <Navbar />
            <div className="App" >
              <div className ="header">
                <h1>Sign Up</h1>
                <h3>Prepare to Enter a World Full of Delicious Bites</h3>
              </div>
    
              <div className="border">
                <table className="normal">
                  <tbody>
                    <tr>
                      <td>
                        {/*Name*/}
                        <label className="label">Name</label>
                        <input className="textbox" type="text" id='name' value={this.state.name} onChange={this.handleNameChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                  <tbody>
                    <tr>
                      <td>
                        {/*Username*/}
                        <label className="label">Username</label>
                        <input className="textbox" type="text" id='username' value={this.state.username} onChange={this.handleUsernameChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                  <tbody>
                    <tr>
                      <td>
                        {/*Email*/}
                        <label className="label">Email</label>
                        <input className="textbox" type="text" id='email' value={this.state.email} onChange={this.handleEmailChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                  <tbody>
                    <tr>
                      <td>
                        {/*Password*/}
                        <label className="label">Password</label>
                        <input className="textbox" type="password" id='password' value={this.state.password} onChange={this.handlePasswordChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                  <tbody>
                    <tr>
                      <td>
                        {/*Security Question*/}
                        <label className="label">Security Question</label>
                        <input className="textbox" type="text" id='question' value={this.state.question} onChange={this.handleQuestionChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                  <tbody>
                    <tr>
                      <td>
                        {/*Security Question Answer */}
                        <label className="label">Security Question Answer</label>
                        <input className="textbox" type="text" id='answer' value={this.state.answer} onChange={this.handleAnswerChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
                </table>
    
                <button className="btn"> Submit </button>
                </div>
    
            </div>
          </form>
      );
    }
  }
}
  
  export default SignUp;