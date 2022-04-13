import React,{ useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');

function ExplorePage () {
    const recipeArray = [];
	const [isLoading, setLoading] = useState(true);
	const [recipes, setRecipeArray] = useState(recipeArray);

    useEffect(() => {

        const handleAddRecipe = () => {
			setRecipeArray(() => [
				...recipeArray,
				recipeArray
			]);
		};

		axios.post(serverAddress+"ExploreLastRecipes",{
			num: "A",
		}).then((res) => {
			if(res.data === false)
				console.log("False reply from database on explore page");
			else
			{
				console.log(res.data.length);
				for(var i = 0; i <res.data.length; i++)
				{
					recipeArray.push({
						name: res.data[i].name,
						image: (res.data[i].recipePicture+"."+res.data[i].recipePictureEXT),
						description: res.data[i].description,
						username: res.data[i].username
					});
					handleAddRecipe();
				}
				setLoading(false);
			}
		}).catch((err) => {
			console.log(err);
			console.log('Error alert! explore.js');
		});

  	}, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<br/><br/><br/><br/>
			<div className="borderRecipe">
				<table>
					<tbody>
						<tr>
							<td className="recipeHeaderCenter"><h3>Recipe Name:</h3></td>
							<td className="recipeHeaderCenter"><h3>Recipe Image</h3></td>
							<td className="recipeHeaderCenter"><h3>Recipe Description:</h3></td>
							<td className="recipeHeaderCenter"><h3>Recipe Username:</h3></td>
						</tr>
							{recipes.map((recipe, index) => (
								<tr><td className="recipeExtra">{recipe.name}</td><td className="recipeExtra"><img className="recipeimage" src={require(('./recipe_images/' + recipe.image))} alt="pic4"/></td><td className="recipeExtra">{recipe.description}</td><td className="recipeExtra">{recipe.username}</td></tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExplorePage;