import "../App.css";
import React,{ useState } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
const {addRecipe} = require('./config.json');

/* 
  Credit
  Forms: https://reactjs.org/docs/forms.html
  Place holder(hints): https://stackoverflow.com/a/3612949/17413708
  Text area: https://stackoverflow.com/a/2528061/17413708
  Dynamic table for ingredients and helper functions: 
   https://stackoverflow.com/a/49174689/17413708
*/

function CreateRecipe () {
  const [listofRecipes, setlistofRecipes] = useState([
    { name: "cookies", description: "somedescription", directions: "these are some very useful directions", servingsize: "11", totaltime: "5", preptime: "5", bakingtime: "5" },
  ]);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [directions, setDirections] = useState("");
const [servingsize, setServingSize] = useState("");
const [preptime, setPrepTime] = useState("");
const [bakingtime, setBakingTime] = useState("");

const addNewRecipe = () => {
  console.log('Trying to addNewRecipe');
  axios.post((`${addRecipe}`), {
    name,
    description,
    directions,
    servingsize,
    preptime,
    bakingtime,
    
  }).then((response) => {
    setlistofRecipes([
      ...listofRecipes,
      {
        name,
        description,
        directions,
        servingsize,
        preptime,
        bakingtime,
      },
    ]);
  });
};

  // state = {
  //   rows: []
  // };
  // handleChange = idx => e => {
  //   const { name, value } = e.target;
  //   const rows = [...this.state.rows];
  //   rows[idx] = {
  //     [name]: value
  //   };
  //   this.setState({
  //     rows
  //   });
  // };
  // handleAddRow = () => {
  //   const item = {
  //     Ingredients: "",
  //     Measurement: ""
  //   };
  //   this.setState({
  //     rows: [...this.state.rows, item]
  //   });
  // };
  // handleRemoveRow = () => {
  //   this.setState({
  //     rows: this.state.rows.slice(0, -1)
  //   });
  // };
  // handleRemoveSpecificRow = (idx) => () => {
  //   const rows = [...this.state.rows]
  //   rows.splice(idx, 1)
  //   this.setState({ rows })
  // }
    return (
      <div className="App">
        <Navbar />
        <div className="header">
          <h1>Create a Recipe</h1>
        </div>

      <div className="centered">
        <form>
					<label className="custom-file-upload">
						<input type="file" id="image" accept="image/png, image/jpeg, image/gif" alt="blobjr"/>
            Upload an Image</label>
          <br /><br />
          <input 
            name="name"
            type="text"
            placeholder="Name"
            onChange={(event) => {setName(event.target.value);}}
            required />
          <br />
          <textarea 
            name="description"
            rows="5" cols="80"
            placeholder="Description"
            onChange={(event) => {setDescription(event.target.value);}}
            required />
          <br />
          <textarea 
            name="directions"
            rows="5" cols="80"
            placeholder="Directions/Ingredients"
            onChange={(event) => {setDirections(event.target.value);}}
            required />
          <br />

          {/* Table for serving size, total time, prep tim, and baking time. */}
          <table className="centered">
            <tbody>
              <tr>
                <th>Serving Size</th>
                <td>
                  <input 
                    name="servingSize"
                    type="number"
                    placeholder="?" className="createrecipeSmall"
                    onChange={(event) => {setServingSize(event.target.value);}}
                    required />
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th>Total Time</th>
                  <th>
                    <input 

                      type="number"
                      placeholder="?" className="createrecipeSmall"
                      required />
                  </th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>Prep Time</th>
                  <th>
                    <input 
                      name="prepTime"
                      type="number"
                      placeholder="?" className="createrecipeSmall"
                      onChange={(event) => {setPrepTime(event.target.value);}}
                      required />
                  </th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th>Baking Time</th>
                  <th>
                    <input 
                      name="bakeTime"
                      type="number"
                      placeholder="?" className="createrecipeSmall"
                      onChange={(event) => {setBakingTime(event.target.value);}}
                      required />
                  </th>
              </tr>
            </tbody>
          </table>

          {/* Dynamic table for adding ingredients, their measurements, and their measurement unit. */}
          {/* <div>
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 column">
                  <table className="centered" id="tab_logic">
                    <thead>
                      <tr>
                        <th className="text-center"> # </th>
                        <th className="text-center"> Ingredients </th>
                        <th className="text-center"> Measurements </th>
                        <th className="text-center"> Units </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="ingredientName"
                              value={this.state.rows[idx].ingredientName}
                              onChange={this.handleChange(idx)}
                              className="ingredients"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="measurement"
                              value={this.state.rows[idx].measurement}
                              onChange={this.handleChange(idx)}
                              className="measurmentsandunits"
                            />
                          </td>
                          <td>
                            <select>
                              <option defaultValue value="none">none</option>
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
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={this.handleAddRow} className="btn btn-primary">
                    Add Row
                  </button>
                  <button
                    onClick={this.handleRemoveRow}
                    className="btn btn-danger float-right"
                  >
                    Delete Last Row
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <input type="submit" value="Submit" onClick={addNewRecipe} />


        </form> 
      </div>
    </div>
    )
  }
export default CreateRecipe;