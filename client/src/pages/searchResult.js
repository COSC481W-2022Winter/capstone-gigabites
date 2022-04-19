import "../App.css";
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
const { serverAddress } = require('./config.json');

function SearchResult() {
  const [isLoading, setLoading] = useState(true);
  const recipeArray = [];
  const [recipes, setRecipeArray] = useState(recipeArray);

  useEffect(() => {
    const handleAddRecipe = () => {
			setRecipeArray(() => [
				...recipeArray,
				recipeArray
			]);
		};

    // Get results
    axios.post(serverAddress+"recipeSearch").then((res) => {
      console.log(JSON.stringify(res.data));
      for(var i = 0; i < res.data.length; i++) {
        recipeArray.push({
          _id: res.data[i]._id,
          name: res.data[i].name,
          description: res.data[i].description,
          username: res.data[i].username,
          recipePicture: res.data[i].recipePicture,
          recipePictureEXT: res.data[i].recipePictureEXT,
        });
        handleAddRecipe();
      }
    setLoading(false);
  })
  .catch((err) => console.log("searchResult.js error: "+err));// eslint-disable-next-line
	}, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      {/*Imports navbar to the top of the page*/}
      <Navbar />
      <div className="header">
        <h1>Search Result</h1>
      </div>

      <div>
				<table>
					<tbody>
						<tr>
              <td className="recipeHeaderCenter"><h3></h3></td>
							<td className="recipeHeaderCenter"><h3>Name</h3></td>
              <td className="recipeHeaderCenter"><h3>Description</h3></td>
              <td className="recipeHeaderCenter"><h3>User</h3></td>
						</tr>
            {console.log('recipes ' + JSON.stringify(recipes))}
					  {recipes.map((recipe, index) => (
							<tr>
                <td className="recipeExtra">
                  {/*<img src={require('./recipe_images/'+recipe.recipePicture + '.' + recipe.recipePictureEXT)} alt="pict"/>*/}
                  <img className="recipeimage" src={require('./recipe_images/'+'default2.png')} alt="Recipe Image"/>
                </td>
                <td className="recipeExtra">
                  <a href={"../recipe/"+recipe._id}>
                    {recipe.name}
                  </a>
                </td>
                <td className="recipeExtra">
                  {recipe.description}
                </td>
                <td className="recipeExtra">
                  {recipe.username}
                </td>
              </tr>
					  ))}
					</tbody>
				</table>
			</div>

    </div>
  );
};

export default SearchResult;