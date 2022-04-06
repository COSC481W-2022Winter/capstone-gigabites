import React,{ useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
import "../App.css";
import axios from 'axios';
const { getIngredientByRecipeID } = require('./config.json');


function Recipe() {
	const ingredientArray = [];
	
	const [isLoading, setLoading] = useState(true);
	const [ingredients, setingredientArray] = useState(ingredientArray);

	  useEffect(() => {

		const handleAddingredient = () => {
			setingredientArray(() => [
				...ingredientArray,
				ingredientArray
			]);
		};

	  	axios.post(`${getIngredientByRecipeID}`, {
		recipeID: ReactSession.get("recipeID"+ReactSession.get("Number"))
		}).then((res) => {
			for(var i = 0; i <res.data.length; i++)
			{
				ingredientArray.push({
					name: res.data[i].name,
					measurement: res.data[i].measurement,
					units: res.data[i].units
				});
				handleAddingredient();
			}
			setLoading(false);
		})
		.catch((err) => console.log("Recipe.js error: "+err));// eslint-disable-next-line
	}, []);
  
	if (isLoading) {
	  return <div className="App">Loading...</div>;
	}
  
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
													<p>{ReactSession.get("recipeTotalTime"+ReactSession.get("Number"))} minutes</p>
												</td>
											</tr>
											<tr>
												<td className="timeHeader">
													<h3>Prep Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipePrepTime"+ReactSession.get("Number"))} {ReactSession.get("recipePrepTimeUnits"+ReactSession.get("Number"))}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Cook Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeCookTime"+ReactSession.get("Number"))} 	{ReactSession.get("recipeCookTimeUnits"+ReactSession.get("Number"))}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Baking Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeBakingTime"+ReactSession.get("Number"))} {ReactSession.get("recipeBakingTimeUnits"+ReactSession.get("Number"))}</p>
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
								<p>{ReactSession.get("amountPerServing"+ReactSession.get("Number"))} {ReactSession.get("amountPerServingUnits"+ReactSession.get("Number"))}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br/>
			<br/>
			<div className="borderRecipe">
				<table>
					<tbody>
						<tr>
							<td className="recipeHeaderCenter"><h3>Ingredient:</h3></td>
							<td className="recipeHeaderCenter"><h3>Measurement:</h3></td>
							<td className="recipeHeaderCenter"><h3>Units:</h3></td>
						</tr>
					{ingredients.map((ingredient, index) => (
							<tr><td className="recipeExtra">{ingredient.name}</td><td className="recipeExtra">{ingredient.measurement}</td><td className="recipeExtra">{ingredient.units}</td></tr>
					))}
					</tbody>
				</table>
			</div>
			<br/>
			<br/>
		</div>);
};

export default Recipe;