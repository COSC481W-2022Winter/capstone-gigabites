import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
	return (
	<ul class="topnav">
	  <li>
		<Link to="/">Home</Link>
	  </li>
	  <li class ="right">
		<Link to="/signup">Sign Up</Link>
	  </li>
	  <li>
		<Link to="/profile">Profile</Link>
	  </li>
	</ul>
	);
  }
  export default navbar;