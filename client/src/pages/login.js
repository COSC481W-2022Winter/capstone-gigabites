import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
var passwordMatch = false;
const {passwordCompare, getPassStatus} = require('./config.json');

const axios = require('axios')

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var passwordValidation = () => {
    axios.post(`${passwordCompare}`, {
      username,
      password
    })
  };

  useEffect(() => {
    axios.get(`${getPassStatus}`).then((response) => {
      console.log(response.data);
      if(response.data === true) {
        alert("login success");
      }
    });

  }, []);

  function validation() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username==='' || password==='')
    { return; }
    else 
    { 
      passwordValidation(); 
    }
  }
// creates alerts
function userpasswordMatch() { 
  if (passwordMatch == false)  
  {
    alert ("Your username does not match this passcode. Try again");
  }
  else if (passwordMatch == true)
  {
    alert('Login Success');
  }
}


  return (
    
      <div className="App" >
        <div className="header">
          <h1>Login</h1>
          <h3>Welcome Back</h3>
        </div>

        <div className="border">
          <form>
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
                    <input type="password" id='password' onChange={(event) => {setPassword(event.target.value);}} required/>
                  </td>
                </tr>
              </tbody>
            </table>
          

            <button onClick={validation} className="btn"> Login </button>
            <Link to="/resetPassword" className="btn">Forgot Password</Link>
          </form>
        </div>
      </div>
  );
}

export default Login;