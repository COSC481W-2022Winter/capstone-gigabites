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
    <div className="App">
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
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>Security Question</th>
          <th>Security Question Answer</th>
        </tr>
        <tr>
          <td> {/*Name*/}
            <input type="text" onChange={(event) => {setName(event.target.value);}} />
          </td> 
          <td> {/*Username*/}
            <input type="text" onChange={(event) => {setUsername(event.target.value);}} />
          </td>
          <td> {/*Email*/}
            <input type="text" onChange={(event) => {setEmail(event.target.value);}} />
          </td>
          <td> {/*Password*/}
            <input type="text" onChange={(event) => {setPassword(event.target.value);}} />
          </td>
          <td> {/*Security Question*/}
            <input type="text" onChange={(event) => {setQuestion(event.target.value);}} />
          </td>
          <td> {/*Security Question Answer */}
            <input type="text" onChange={(event) => {setAnswer(event.target.value);}} />
          </td>
        </tr>
      </table>
        <button onClick={createUser}> Create User </button>
    </div>
  );
}

export default App;