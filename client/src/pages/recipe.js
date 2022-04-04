import React from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
import "../App.css";

const Recipe = () => {
	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<br/><br/>

            <div className="centered">
				<h1>{ReactSession.get("recipeName"+ReactSession.get("Number"))}</h1>
				<table className="recipePageTableMain">
					<tbody>
						<tr>
							<td className="imageTD">
								<img className="recipeCenter" src={require("./recipe_images/"+(ReactSession.get("recipeImage"+ReactSession.get("Number"))))} alt="RecipeImage" />
							</td>
							<td>
								<div className="borderRecipeTop">
									<table className="recipePageTable">
										<tbody>
											<tr>
												<td className="timeHeader">
													<h3>Total Time:</h3>
												</td>
												<td className="time">
													<p>{ReactSession.get("recipeTotalTime"+ReactSession.get("Number"))}</p>
												</td>
											</tr>
											<tr>
												<td className="timeHeader">
													<h3>Prep Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipePrepTime"+ReactSession.get("Number"))}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Cook Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeCookTime"+ReactSession.get("Number"))}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Baking Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeBakingTime"+ReactSession.get("Number"))}</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br/>
			<br/>
            <div className="borderRecipe">
				<table className="recipePageTable">
					<tbody>
						<tr>
							<td className="recipeHeaderCenter">
								<h3>Recipe Name:</h3>
							</td>
							<td className="recipeHeaderCenter">
								<h3>Owner:</h3>
							</td>
						</tr>
						<tr>
							<td className="recipeExtra">
								<p>{ReactSession.get("recipeName"+ReactSession.get("Number"))}</p>
							</td>
							<td className="recipeExtra">
								<p>{ReactSession.get("username")}</p>
							</td>
						</tr>
						<tr>
							<td>
								<hr/>
							</td>
							<td>
								<hr/>
							</td>
						</tr>
						<tr>
							<td className="recipeHeaderCenter">
								<h3>Description:</h3>
							</td>

							<td className="recipeHeaderCenter"> 
								<h3>Directions:</h3>
							</td>
						</tr>
						<tr>
							<td className="recipeExtra">
								<p>{ReactSession.get("recipeDescription"+ReactSession.get("Number"))}</p>
							</td>
							<td className="recipeExtra">
								<p>{ReactSession.get("recipeDirections"+ReactSession.get("Number"))}</p>
							</td>
						</tr>
						<tr>
							<td>
								<hr/>
							</td>
							<td>
								<hr/>
							</td>
						</tr>
						<tr>
							<td className="recipeHeaderCenter">
								<h3>Serving Size:</h3>
							</td>
							<td className="recipeHeaderCenter">
								<h3>Amount per serving:</h3>
							</td>
						</tr>
						<tr>
						<td className="recipeExtra">
								<p>{ReactSession.get("recipeServingSize"+ReactSession.get("Number"))}</p>
							</td>
							<td className="recipeExtra">
								<p>Amount per serving + units will display here when given</p>
							</td>
						</tr>

					</tbody>
				</table>
			</div>
			<br/>
			<br/>
		</div>
	);
};

export default Recipe;