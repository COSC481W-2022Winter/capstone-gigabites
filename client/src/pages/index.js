import React from "react";
import Navbar from '../components/Navbar';

const Home = () => {
	return (
		<div className='Home-component'>		
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<div className="borderHome">
				<input className="homeSearch" type="text" />
			</div>
		</div>
	);
};

export default Home;