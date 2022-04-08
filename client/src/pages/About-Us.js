import "../App.css";
import React from "react";
import Navbar from '../components/Navbar';
import axios from "axios";

const { serverAddress } = require('./config.json');

var developersData = [
	['name', 'role', 'bio', 'githubURL'],
	['name', 'role', 'bio', 'githubURL'],
	['name', 'role', 'bio', 'githubURL'],
	['name', 'role', 'bio', 'githubURL'],
	['name', 'role', 'bio', 'githubURL'],
	['name', 'role', 'bio', 'githubURL']
  ];

const AboutUs = () => {
	//Compares password to the hashed one in the database 
	axios.post(serverAddress+"getDevelopers", {
		anything: "a",
	  }).then((res) => {
		if(res.data === false)
		  console.data("False reply from database");
		else{
	
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
		  }
		  
		}
	  }).catch(() => {
		console.log('Error alert! Developer.js');
	  });
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
								<h1>{ developersData[0][0]} </h1>
								<h3>{ developersData[0][1]} </h3>
								<h3>{ developersData[0][2]} </h3>
								<h3><a href={ developersData[0][3]} >Github</a></h3>
							
			
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developersData[1][0]} </h1>
								<h3>{ developersData[1][1]} </h3>
								<h3>{ developersData[1][2]} </h3>
								<h3><a href={ developersData[1][3]} >Github</a></h3>
							
			
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developersData[2][0]} </h1>
								<h3>{ developersData[2][1]} </h3>
								<h3>{ developersData[2][2]} </h3>
								<h3><a href={ developersData[2][3]} >Github</a></h3>
							
			
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developersData[3][0]} </h1>
								<h3>{ developersData[3][1]} </h3>
								<h3>{ developersData[3][2]} </h3>
								<h3><a href={ developersData[3][3]} >Github</a></h3>
							
			
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developersData[4][0]} </h1>
								<h3>{ developersData[4][1]} </h3>
								<h3>{ developersData[4][2]} </h3>
								<h3><a href={ developersData[4][3]} >Github</a></h3>
							
			
							</div>
						</td>
						</tr>
						<tr>
						<td>
							<div className="centered">
							<hr></hr>
								<h1>{ developersData[5][0]} </h1>
								<h3>{ developersData[5][1]} </h3>
								<h3>{ developersData[5][2]} </h3>
								<h3><a href={ developersData[5][3]} >Github</a></h3>
							
			
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