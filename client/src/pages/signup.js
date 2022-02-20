//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo
import "../App.css";
import React,{ useState, useEffect } from "react";
import Axios from "axios";
const {getUsers, createUsers} = require('./config.json');

function SignUp() {
    const [listOfUsers, setListOfUsers] = useState([
      { id: 1, name: "Pedro", age: 22, username: "pedro123"},
    ]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
    useEffect(() => {
      Axios.get(`${getUsers}`).then((response) => {
        setListOfUsers(response.data);
      });
    }, []);
  
    const createUser = () => {
      Axios.post((`${createUsers}`), {
        name,
        username,
        email,
        password,
        question,
        answer,
      }).then((response) => {
        setListOfUsers([
          ...listOfUsers,
          {
            name,
            username,
            email,
            password,
            question,
            answer,
          },
        ]);
      });
    };
  
  
  function validation()
  {
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
  
    if(name==='' || username==='' || email==='' || password==='' || question==='' || answer==='')
    { return; }
    else 
    { 
        createUser(); 
    }
  } 
  
    return ( 
      
      // { This DIV displays a list of users one by one from the database until there are no more document records left. }
     /*<div className="App">
        <div className="usersDisplay">
           {listOfUsers.map((user) => {
            return (
              <div>
                <h1>Name: {user.name}</h1>
                <h1>Username: {user.username}</h1>
                <h1>Email: {user.email}</h1>
                <h1>Password: {user.password}</h1>
                <h1>Question: {user.question}</h1>
                <h1>Answer: {user.answer}</h1>
                <br />
              </div>
            );
          })}
        </div>
      */
        <form>
          <div className="App" >
            <div className ="header">
              <h1>Sign Up</h1>
              <h3>Prepare to Enter a World Full of Delicious Bites</h3>
            </div>
   
            <div className="border">
              <table>
                <tr>
                  <td>
                    {/*Name*/}
                    <label className="label">Name</label>
                    <input type="text" id='name' onChange={(event) => {setName(event.target.value);}} required/>
                  </td>
                </tr>
  
                <tr>
                  <td>
                    {/*Username*/}
                    <label className="label">Username</label>
                    <input type="text" id='username' onChange={(event) => {setUsername(event.target.value);}} required/>
                  </td>
                </tr>
  
                <tr>
                  <td>
                    {/*Email*/}
                    <label className="label">Email</label>
                    <input type="text" id='email' onChange={(event) => {setEmail(event.target.value);}} required/>
                  </td>
                </tr>
  
                <tr>
                  <td>
                    {/*Password*/}
                    <label className="label">Password</label>
                    <input type="text" id='password' onChange={(event) => {setPassword(event.target.value);}} required/>
                  </td>
                </tr>
  
                <tr>
                  <td>
                    {/*Security Question*/}
                    <label className="label">Security Question</label>
                    <input type="text" id='question' onChange={(event) => {setQuestion(event.target.value);}} required/>
                  </td>
                </tr>
  
                <tr>
                  <td>
                    {/*Security Question Answer */}
                    <label className="label">Security Question Answer</label>
                    <input type="text" id='answer' onChange={(event) => {setAnswer(event.target.value);}} required/>
                  </td>
                </tr>
  
              </table>
  
              <button onClick={validation} className="btn"> Submit </button>
              </div>
  
          </div>
        </form>
    );
  }
  
  export default SignUp;