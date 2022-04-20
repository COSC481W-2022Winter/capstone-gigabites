import React,{ useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
import "../App.css";
import axios from 'axios';
import {useParams} from "react-router-dom";
import {  Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
const { serverAddress } = require('./config.json');
var temp;

//Gets a list of recipes from the backend based on the logged in users username
function getRecipesByRecipeID()
{
  axios.post(serverAddress+"getRecipeByRecipeIDs",{
    id: ReactSession.get("recipeID")
  }).then((res) => {
    if(res.data === false)
      console.data("False reply from database on recipe page");
    else{
		var output = res.data[0];
		console.log(output);
	  	ReactSession.set("recipeUsername", output.username);
        ReactSession.set("recipeName",output.name);
        ReactSession.set("recipeImage", output.recipePicture+"."+output.recipePictureEXT);
        ReactSession.set("recipeDescription", output.description);
        ReactSession.set("recipeDirections",output.directions);
        ReactSession.set("recipeServingSize",output.servingsize);
        ReactSession.set("recipeTotalTime",output.totaltime);
        ReactSession.set("recipePrepTime",output.preptime);
        ReactSession.set("recipeBakingTime",output.bakingtime);
        ReactSession.set("recipeCookTime",output.cooktime);
        ReactSession.set("recipePrepTimeUnits",output.preptimeunit);
        ReactSession.set("recipeCookTimeUnits",output.cooktimeunit);
        ReactSession.set("recipeBakingTimeUnits",output.bakingtimeunit);
        ReactSession.set("amountPerServing",output.amountperserving);
        ReactSession.set("amountPerServingUnits",output.amountperservingunit);
    }
  }).catch(() => {
    console.log('Error alert! Recipe.js');
  });
}

function Recipe() 
{
	const ingredientArray = [];
	const [isLoading, setLoading] = useState(true);
	const [ingredients, setingredientArray] = useState(ingredientArray);
	const {RecipeID} = useParams();

	ReactSession.set("recipeID",RecipeID);

	  useEffect(() => {
		getRecipesByRecipeID();

		const handleAddingredient = () => {
			setingredientArray(() => [
				...ingredientArray,
				ingredientArray
			]);
		};

		axios.post(serverAddress+"getIngredientsByRecipeID", {
		recipeID: ReactSession.get("recipeID")
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
			temp = "/recipe/edit/"+ReactSession.get("recipeID");
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
			{/*If coming from edit recipe page, display successfully updated in alert!  (Also resets ReactSession fromlogin variable)*/}
			{(ReactSession.get('fromEditRecipe') === true) &&
				<div>
					<Alert severity="success">Successfully updated your recipe!</Alert>
					{ReactSession.remove("fromEditRecipe")}
				</div>
    		}
			<br/><br/>

			{(ReactSession.get('fromCreateRecipe') === true) &&
				<div>
				{alert('Recipe successfully added')}
            	{ReactSession.remove("fromCreateRecipe")}
				</div>
			}


		    <div className="centered">
				<h1>{ReactSession.get("recipeName")}</h1>

				{(ReactSession.get('username') === ReactSession.get("recipeUsername")) &&
					<Link to={temp} className="profilebuttons">Edit Recipe</Link>
				}
				<br/><br/>
				<table className="recipePageTableMain">
					<tbody>
						<tr>
							<td className="imageTD">
								<img className="recipeCenter" src={require("./recipe_images/"+(ReactSession.get("recipeImage")))} alt="RecipeImage" />
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
													<p>{ReactSession.get("recipeTotalTime")} minutes</p>
												</td>
											</tr>
											<tr>
												<td className="timeHeader">
													<h3>Prep Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipePrepTime")} {ReactSession.get("recipePrepTimeUnits")}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Cook Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeCookTime")} 	{ReactSession.get("recipeCookTimeUnits")}</p>
												</td>
											</tr>

											<tr>
												<td className="timeHeader">
													<h3>Baking Time:</h3>
												</td>
												
												<td className="time">
													<p>{ReactSession.get("recipeBakingTime")} {ReactSession.get("recipeBakingTimeUnits")}</p>
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
								<p>{ReactSession.get("recipeName")}</p>
							</td>
							<td className="recipeExtra">
								<p>{ReactSession.get("recipeUsername")}</p>
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
								<p>{ReactSession.get("recipeDescription")}</p>
							</td>
							<td className="recipeExtra">
								<p>{ReactSession.get("recipeDirections")}</p>
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
								<p>{ReactSession.get("recipeServingSize")}</p>
							</td>
							<td className="recipeExtra">
								<p>{ReactSession.get("amountPerServing")} {ReactSession.get("amountPerServingUnits")}</p>
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
			<div className="centered">
			<br></br>
			</div>
		</div>);
};

export default Recipe;