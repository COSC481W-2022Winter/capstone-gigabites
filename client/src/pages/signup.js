//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo
import "../App.css";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
const {getUnique, createUsers} = require('./config.json');

function SignUp() 
{
    const [listOfUsers, setListOfUsers] = useState([
      { id: 1, name: "Pedro", age: 22, username: "pedro123"},
    ]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
    const createUser = () => {
      axios.post((`${createUsers}`), {
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

    useEffect(() => {
      axios.get(`${getUnique}`).then((response) => {
        console.log(response.data);

        if(response.data === true) {
          console.log('Signup successful!');
          alert("Signup successful!");
        }
        else if(response.data === false) {
          console.log("Username already taken!  Please try another username!");
          alert ("Username already taken!  Please try another username!");
        }
      });
    }, []);

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
  
  function validation()
  {
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;

    if(name==='' || username==='' || email==='' || password==='' || question==='' || answer==='')
    {
      return;
    }
    if(checkPassword(password) && checkEmail(email)) 
    {
      createUser();
    }
    else 
      return;
  }


    return ( 
        <form>
          <div className="App">
          	{/*Imports navbar to the top of the page*/}
          	<Navbar />
            <div className ="header">
              <h1>Sign Up</h1>
              <h3>Prepare to Enter a World Full of Delicious Bites</h3>
            </div>
   
            <div className="border">
              <table>
                <tbody>
                  <tr>
                    <td>
                      {/*Name*/}
                      <label className="label">Name</label>
                      <input type="text" id='name' onChange={(event) => {setName(event.target.value);}} required/>
                    </td>
                  </tr>
                </tbody>
  
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
                      {/*Email*/}
                      <label className="label">Email</label>
                      <input type="text" id='email' onChange={(event) => {setEmail(event.target.value);}} required/>
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
  
                <tbody>
                  <tr>
                    <td>
                      {/*Security Question*/}
                      <label className="label">Security Question</label>
                      <input type="text" id='question' onChange={(event) => {setQuestion(event.target.value);}} required/>
                    </td>
                  </tr>
                </tbody>
  
                <tbody>
                  <tr>
                    <td>
                      {/*Security Question Answer */}
                      <label className="label">Security Question Answer</label>
                      <input type="text" id='answer' onChange={(event) => {setAnswer(event.target.value);}} required/>
                    </td>
                  </tr>
                </tbody>
  
              </table>
  
              <button onClick={validation} className="btn"> Submit </button>
              </div>
  
          </div>
        </form>
    );
  }
  
  export default SignUp;