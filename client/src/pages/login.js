import "../App.css";
import React, { useEffect, useState } from "react";
const {passwordCompare, getPassStatus} = require('./config.json');

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
      console.log('Displaying Data on Client'+data);
      if(data === true) {
        alert("login success");
      }
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
                  <input type="password" id='password' onChange={(event) => {setPassword(event.target.value);}} required/>
                </td>
              </tr>
            </tbody>
          </table>
          

          <button onClick={validation} className="btn"> Login </button>

          <button className="btn"> Forgot Password </button>
        </div>

      </div>
    </form>
  );
}

export default Login;