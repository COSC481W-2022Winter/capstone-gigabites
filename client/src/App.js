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
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get(`${getUsers}`).then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post((`${createUsers}`), {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;
