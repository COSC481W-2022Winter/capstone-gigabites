import React from 'react';
import {  Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';


const navbar= () =>{
	return (
	<div>
		{/* Shows the logged in session username above the NAVBAR for temporary testing and debugging purposes */}
		<p>You are logged in as: {ReactSession.get('username')}</p>
		<ul className="topnav">
			<li>
				<Link to="/">Home</Link>
			</li>
			<li className ="right">
				<Link to="/signup">Sign Up</Link>
			</li>
			<li className ="right">
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/profile">Profile</Link>
			</li>
			<li>
				<Link to="/ingredientSearch">Ingredient Search</Link>
			</li>
		</ul>
	</div>
	);
  }
  export default navbar;