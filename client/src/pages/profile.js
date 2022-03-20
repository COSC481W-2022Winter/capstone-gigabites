import React from "react";
import Navbar from '../components/Navbar';

const Profile = () => {
	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<h1>Welcome to the profile page</h1>
		</div>
	);
};

export default Profile;