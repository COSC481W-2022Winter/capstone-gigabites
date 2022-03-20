import React from "react";
import Navbar from '../components/Navbar';

const Recipe = () => {
	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<h1>Welcome to the recipe page</h1>
		</div>
	);
};

export default Recipe;