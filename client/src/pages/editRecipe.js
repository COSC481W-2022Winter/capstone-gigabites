import "../App.css";
import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Navbar from '../components/Navbar';
import axios from 'axios';
const { serverAddress } = require('./config.json');

function ingredientRemove(e){
  var target = e.target;
  //target.parentNode.parentNode.removeChild(target.parentNode);
  var trs = document.getElementById("tab_logic").querySelector('tbody').querySelectorAll('tr');
  if (trs.length < 2) {
    alert('You need at least one ingredient')
  } else {
    target.parentNode.parentNode.remove();
  }
}
function ingredientAdd(){
  var tr = document.getElementById("tab_logic").querySelector('tbody').querySelector('tr:last-child');
  var clone = tr.cloneNode(true);
  var tdList = clone.querySelectorAll('td');
  tdList[0].innerText = parseInt(tdList[0].innerText) + 1;
  tdList[1].querySelector('input').id = "in" + tdList[0].innerText;
  tdList[1].querySelector('input').value = "";
  tdList[2].querySelector('input').value = 0;
  tdList[3].querySelector('select').querySelector('option').value = "none";
  tdList[3].querySelector('select').querySelector('option').text = "none";
  tdList[4].querySelector('button').addEventListener("click", function(e){
    ingredientRemove(e);
  });
  document.getElementById("tab_logic").querySelector('tbody').appendChild(clone);

}


function getRecipesByRecipeID() {
  axios.post(serverAddress + "getRecipeByRecipeIDs", {
    id: ReactSession.get("recipeID")
  }).then((res) => {
    if (res.data === false)
      console.data("False reply from database on recipe page");
    else {
      var output = res.data[0];
      console.log(output);
      ReactSession.set("recipeUsername", output.username);
      ReactSession.set("recipeName", output.name);
      ReactSession.set("recipeDescription", output.description);
      ReactSession.set("recipeDirections", output.directions);
      ReactSession.set("recipeServingSize", output.servingsize);
      //ReactSession.set("recipeTotalTime", output.totaltime);
      ReactSession.set("recipePrepTime", output.preptime);
      ReactSession.set("recipeBakingTime", output.bakingtime);
      ReactSession.set("recipeCookTime", output.cooktime);
      ReactSession.set("recipePrepTimeUnits", output.preptimeunit);
      ReactSession.set("recipeCookTimeUnits", output.cooktimeunit);
      ReactSession.set("recipeBakingTimeUnits", output.bakingtimeunit);
      ReactSession.set("amountPerServing", output.amountperserving);
      ReactSession.set("amountPerServingUnits", output.amountperservingunit);

    }
  }).catch(() => {
    console.log('Error alert! editRecipe.js');
  });
}

function EditRecipe() {
  var ingredientArray = [];
  const [isLoading, setLoading] = useState(true);
  const [ingredients, setingredientArray] = useState(ingredientArray);

  useEffect(() => {

    getRecipesByRecipeID();

    const handleAddingredient = () => {
      setingredientArray(() => [
        ...ingredientArray
      ]);
    };

    axios.post(serverAddress + "getIngredientsByRecipeID", {
      recipeID: ReactSession.get("recipeID")
    }).then((res) => {

      console.log(res.data.length);
      for (var i = 0; i < res.data.length; i++) {
        ingredientArray.push({
          name: res.data[i].name,
          measurement: res.data[i].measurement,
          units: res.data[i].units
        });
        handleAddingredient();
      }
      setLoading(false);
    })
      .catch((err) => console.log("EditRecipe.js error: " + err));// eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="App">
      <Navbar />
      <div className="header">
        <h1>Edit Recipe</h1>
      </div>

      <div className="centered">
        <form action={serverAddress + "editRecipe"} method='post' encType="multipart/form-data">
          <label className="label-no-align">Upload an Image</label>
          <br /><br />
          <input type="file" name="sampleFile" accept="image/png, image/jpeg" />
          <br /><br />
          <div className="borderEditRecipe">
            <input name="id" type="text" value={ReactSession.get("recipeID")} hidden readOnly />

            <label className="editRecipe">Name</label>
            <input type="text" defaultValue={ReactSession.get("recipeName")} id="name" name="name" minLength="3" maxLength="100" required />

            <br />
            <label className="editRecipe">Description</label>
            <textarea name="description" minLength="20" maxLength="500" rows="5" cols="80" defaultValue={ReactSession.get("recipeDescription")} required >
            </textarea>
            <br />
            <label className="editRecipe">Directions</label>
            <textarea name="directions" minLength="20" maxLength="500" rows="5" cols="80" defaultValue={ReactSession.get("recipeDirections")} required >
            </textarea>
            <br />

            {/* Table for serving size, prep time, and baking time. */}
            <table className="centered">
              <tbody>
                <tr>
                  <th>Serving Size</th>
                  <td>
                    <input name="servingsize" className="createrecipeSmall" type="number" min="1" defaultValue={ReactSession.get("recipeServingSize")} required />
                  </td>
                  <th>Units</th>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th>Amount per Serving</th>
                  <td>
                    <input name="amountperserving" type="number" min="1" placeholder="?" className="createrecipeSmall" defaultValue={ReactSession.get("amountPerServing")} required />
                  </td>
                  <td>
                    <select name="amountperservingunit" >
                      <option value="g">g</option>
                      <option value="teaspoon">teaspoon</option>
                      <option value="tablespoon">tablespoon</option>
                      <option value="fluidOz">fl oz</option>
                      <option value="cup">cup</option>
                      <option value="ml">milliliter</option>
                      <option value="oz">oz</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th>Prep Time</th>
                  <th>
                    <input name="preptime" type="number" min="0" placeholder="?" defaultValue={ReactSession.get("recipePrepTime")} className="createrecipeSmall" required />
                  </th>
                  <td>
                    <select name="preptimeunit" >
                      <option selected hidden value={ReactSession.get("recipePrepTimeUnits")}>{ReactSession.get("recipePrepTimeUnits")}</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th>Cook Time</th>
                  <th>
                    <input name="cooktime" type="number" min="0" placeholder="?" defaultValue={ReactSession.get("recipeCookTime")} className="createrecipeSmall" required />
                  </th>
                  <td>
                    <select name="cooktimeunit" >
                      <option selected hidden value={ReactSession.get("recipeCookTimeUnits")}>{ReactSession.get("recipeCookTimeUnits")}</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th>Baking Time</th>
                  <th>
                    <input name="bakingtime" type="number" min="0" placeholder="?" defaultValue={ReactSession.get("recipeBakingTime")} className="createrecipeSmall" required />
                  </th>
                  <td>
                    <select name="bakingtimeunit" >
                      <option selected hidden value={ReactSession.get("recipeBakingTimeUnits")}>{ReactSession.get("recipeBakingTimeUnits")}</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Dynamic table for adding ingredients, their measurements, and their measurement unit. */}
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 column">
                  <table className="centered" id="tab_logic">
                    <thead>
                      <tr>
                        <th className="text-center"> </th>
                        <th className="text-center"> Ingredients </th>
                        <th className="text-center"> Measurements </th>
                        <th className="text-center"> Units </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((item, idx) => (
                        <tr key={idx}>
                          <td class="hide">{idx}</td>
                          <td>
                            <input type="text" id={"in"+idx} name="ingredient" className="ingredients" defaultValue={item.name} required />
                          </td>
                          <td>
                            <input type="number" name="measurement" min="0" defaultValue={item.measurement} className="measurmentsandunits" required />
                          </td>
                          <td>
                            <select name="units">
                              <option selected hidden value={item.units}>{item.units}</option>
                              <option value="none">none</option>
                              <option value="teaspoon">teaspoon</option>
                              <option value="tablespoon">tablespoon</option>
                              <option value="fluidOz">fl oz</option>
                              <option value="cup">cup</option>
                              <option value="pint">pint</option>
                              <option value="quart">quart</option>
                              <option value="gallon">gallon</option>
                              <option value="ml">milliliter</option>
                              <option value="liter">liter</option>
                              <option value="lb">lb</option>
                              <option value="oz">oz</option>
                              <option value="mg">mg</option>
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                            </select>
                          </td>
                          <td>
                            <button
                            type="button" onClick={ingredientRemove} className="btn btn-outline-danger btn-sm">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" onClick={ingredientAdd} className="btn btn-primary">
                    Add Row
                  </button>
                </div>
              </div>
            </div>
          </div>
          <input value="Submit" type="submit" className="btn" />
        </form>
      </div>
    </div>
  )
}
export default EditRecipe;