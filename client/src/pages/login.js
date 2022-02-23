import "../App.css";
import React, { useState } from "react";
// import Axios from "axios";
const {passwordCompare} = require('./config.json');
// const bcrypt = require('bcrypt');

const axios = require('axios')



function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var passwordValidation = () => {
    console.log("in passwordValidation var");
    axios.post(`${passwordCompare}`, {
      username,
      password
    })
    .then(function (data) {
      if(data === 'yes') {
        alert("login success");
      }
    })
};

  // const passwordValidation = () => {
  //   Axios.post(`${passwordCompare}`, {
  //     username,
  //     password
  //   })
  //   .then((response) => {
      
  //   });
  // };

  function validation() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // var hash = "";
    
    // bcrypt.compare(password, hash, function(err, result) {
    // });

    if(username==='' || password==='')
    { return; }
    else 
    { 
        alert("calling password validation");
        passwordValidation(); 
    }
  }

  return (
    <form>
      <div className="App" >
        <div className="header">
          <h1>Login</h1>
          <h3>Welcome Back</h3>
        </div>

        <div className="border">
          <table>
            <tbody>
              <tr>
                <td>
                  {/*Username*/}
                  <label className="label">Username</label>
                  <input type="text" id='username' onChange={(event) => {setUsername(event.target.value);}} required/>
                </td>
              </tr>
            </tbody>

            <tbody>
            <tr>
              <td>
                  {/*Password*/}
                  <label className="label">Password</label>
                  <input type="text" id='password' onChange={(event) => {setPassword(event.target.value);}} required/>
                </td>
              </tr>
            </tbody>
          </table>
          

          <button onClick={validation} className="btn"> Login </button>

          <button  className="btn"> Forgot Password </button>
        </div>

      </div>
    </form>
  );
}

export default Login;