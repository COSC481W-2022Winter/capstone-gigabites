import "../App.css";
import React,{ useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
const { serverAddress } = require('./config.json');

function GithubURL(path)
{
	window.location.href = path;	  
}
const AboutUs = () => {

	var developersData = [
		['name', 'role', 'bio', 'githubURL'],
		['name', 'role', 'bio', 'githubURL'],
		['name', 'role', 'bio', 'githubURL'],
		['name', 'role', 'bio', 'githubURL'],
		['name', 'role', 'bio', 'githubURL'],
		['name', 'role', 'bio', 'githubURL']
	  ];

	const [isLoading, setLoading] = useState(true);
	const [developers, setdevelopersArray] = useState(developersData);


	useEffect(() => {

		const handlesetdevelopersArray = () => {
			setdevelopersArray(() => [
				...developersData,
				developersData
			]);
		};

		//Compares password to the hashed one in the database 
		axios.post(serverAddress+"getDevelopers", {
			anything: "a",
		}).then((res) => {
			if(res.data === false)
			console.data("False reply from database");
			else
			{
				var length = res.data.length
				for(var i = 0; i < length; i++)
				{
					developersData[i][0] = res.data[i].name;
					developersData[i][1] = res.data[i].role;
					developersData[i][2] = res.data[i].bio;
					developersData[i][3] = res.data[i].githubURL;
					console.log(developersData[i][0]);
					console.log(developersData[i][1]);
					console.log(developersData[i][2]);
					console.log(developersData[i][3]);
					handlesetdevelopersArray();
				}
				setLoading(false);
			}
		}).catch(() => {console.log('Error alert! Developer.js');});// eslint-disable-next-line
	}, []);
	
	if (isLoading) {
	return <div className="App">Loading...</div>;
	}
	
	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<div className ="header">
				<h1>About Us!</h1>
				<h3>Who we are and where to find more info</h3>
			</div>
				<div className="border">
				{/* Each developer and there relevant info becomes displayed */}
				
					<table className="normal">
					<tbody>
						<tr>
						<td>
							<div className="centered">
								<h1>{ developers[0][0]} </h1>
								<h3>{ developers[0][1]} </h3>
								<h3>{ developers[0][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[0][3])} >Github</button></h3>
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developers[1][0]} </h1>
								<h3>{ developers[1][1]} </h3>
								<h3>{ developers[1][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[1][3])}>Github</button></h3>
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developers[2][0]} </h1>
								<h3>{ developers[2][1]} </h3>
								<h3>{ developers[2][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[2][3])}>Github</button></h3>
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developers[3][0]} </h1>
								<h3>{ developers[3][1]} </h3>
								<h3>{ developers[3][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[3][3])}>Github</button></h3>
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developers[4][0]} </h1>
								<h3>{ developers[4][1]} </h3>
								<h3>{ developers[4][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[4][3])}>Github</button></h3>
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developers[5][0]} </h1>
								<h3>{ developers[5][1]} </h3>
								<h3>{ developers[5][2]} </h3>
								<h3><button className="aboutus" onClick={() => GithubURL(developers[5][3])}>Github</button></h3>
							</div>
						</td>
						</tr>
					</tbody>
					</table>
				</div>
		</div>
	);

};

export default AboutUs;
