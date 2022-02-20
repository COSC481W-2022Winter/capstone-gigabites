import "../App.css";
import React, { useState, useEffect } from "react";

function login() {
  return (
    <form>
      <div className="App" >
        <div class="header">
          <h1>Sign In</h1>
          <h3>Welcome Back</h3>
        </div>

        <div className="border">
          <table>
            <tr>
              <td>
                {/*Username*/}
                <label className="label">Username</label>
                <input type="text" id='username'/>
              </td>
            </tr>

            <tr>
              <td>
                {/*Password*/}
                <label className="label">Password</label>
                <input type="text" id='password' />
              </td>
            </tr>
          </table>

          <button className="btn"> Login </button>
        </div>

      </div>
    </form>
  );
}

export default login;