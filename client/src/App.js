//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

import "./App.css";
import React,{ useState, useEffect } from "react";
import Axios from "axios";
const {getUsers, createUsers} = require('./config.json');

function App() {
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
      <div className="App">
      <div class ="header">
        <h1>User Registration</h1>
      </div>
 
      <app>
        {/*Name*/}
        <label className="label">Name</label>
        <input type="text" onChange={(event) => {setName(event.target.value);}} />
        {/*Username*/}
        <label className="label">Username</label>
        <input type="text" onChange={(event) => {setUsername(event.target.value);}} />
        {/*Email*/}
        <label className="label">Email</label>
        <input type="text" onChange={(event) => {setEmail(event.target.value);}} />
        {/*Password*/}
        <label className="label">Password</label>
        <input type="text" onChange={(event) => {setPassword(event.target.value);}} />
        {/*Security Question*/}
        <label className="label">Security Question</label>
        <input type="text" onChange={(event) => {setQuestion(event.target.value);}} />
        {/*Security Question Answer */}
        <label className="label">Security Question Answer</label>
        <input type="text" onChange={(event) => {setAnswer(event.target.value);}} />
        
        <button onClick={createUser} className="btn"> Submit </button>
      </app>
    </div>
  );
}

export default App;