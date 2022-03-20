import React from 'react';
import {  Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Logout from '../logout';
import "../../App.css";

/*Updates profile page URL based on users username*/
let finalURL = '/profile/'+ReactSession.get('username');

const navbar= () =>{
	return (
	<div>
		{/* Shows the logged in session username above the NAVBAR for temporary testing and debugging purposes */}
		<p>You are logged in as: {ReactSession.get('username')}</p>
		<ul className="topnav">
			<li>
				<Link to="/">Home</Link>
			</li>
			{/*Makes the navbar dynamic, displays the login and signup buttons if the user is not signed in*/}
			{(ReactSession.get('username') === undefined) &&
			<li className ="right">
				<Link to="/signup">Sign Up</Link>
			</li>}

			{(ReactSession.get('username') === undefined) &&
			<li className ="right">
				<Link to="/login">Login</Link>
			</li>}

			<li>
				<Link to={finalURL}>Profile</Link>
			</li>
			{/*Makes the navbar dynamic, displays the logout button if the user is signed in*/}
			{(ReactSession.get('username') !== undefined) &&
				<Logout />
			}

		</ul>
	</div>
	);
  }
  export default navbar;