import "../App.css";
import React from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');

/* 
  Credit
  Forms: https://reactjs.org/docs/forms.html
  Place holder(hints): https://stackoverflow.com/a/3612949/17413708
  Text area: https://stackoverflow.com/a/2528061/17413708
  Dynamic table for ingredients and helper functions: 
   https://stackoverflow.com/a/49174689/17413708
  Min/Max constraint for text area: https://stackoverflow.com/a/29214886/17413708
  Form submiting on deleting a row fix: https://stackoverflow.com/a/39959351/17413708
*/

class CreateRecipe extends React.Component {
  constructor(val) {
    super(val);
    this.state = {rows:[{}], totaltime: 0, name: '', description: '', directions: '', servingsize: '', amountperserving: '', amountperservingunit: 'g', preptime: '', preptimeunit: 'minutes', cooktime: '', cooktimeunit: 'minutes', bakingtime: '', bakingtimeunit: 'minutes'};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleServingSizeChange = this.handleServingSizeChange.bind(this);
    this.handleAmountPerServingChange = this.handleAmountPerServingChange.bind(this);
    this.handlePrepTimeChange = this.handlePrepTimeChange.bind(this);
    this.handleCookTimeChange = this.handleCookTimeChange.bind(this);
    this.handleBakingTimeChange = this.handleBakingTimeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
  }
  
  handleChange (idx,e) {
    const { name, value } = e.target;
    const rows = [...this.state.rows];

    rows[idx] = {
      ...rows[idx],
      [name]: value
    };
    this.setState({
      rows
    });
  };

  handleAddRow = () => {
    const item = {
      ingredient: "",
      measurement: "",
      units: "",
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveSpecificRow = (idx) => () => { 
    if (idx === 0) {
      alert("You need atleast 1 ingredient");
      return
    }
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

  //Function executes whenever user changes the name textfield
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  //Function executes whenever user changes the description textfield
  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }
  //Function executes whenever user changes the directions textfield
  handleDirectionsChange(event) {
    this.setState({directions: event.target.value});
  }
  //Function executes whenever user changes the servingsize textfield
  handleServingSizeChange(event) {
    this.setState({servingsize: event.target.value});
  }
  //Function executes whenever user changes the amountperserving textfield
  handleAmountPerServingChange(event) {
    this.setState({amountperserving: event.target.value});
  }
  //Function executes whenever user changes the preptime textfield
  handlePrepTimeChange(event) {
    this.totaltime = this.bakingtime + this.cooktime + this.preptime;
    this.setState({preptime: event.target.value});
  }
  //Function executes whenever user changes the bakingtime textfield
  handleBakingTimeChange(event) {
    this.totaltime = this.bakingtime + this.cooktime + this.preptime;
    this.setState({bakingtime: event.target.value});
  }
  //Function executes whenever user changes the cooktime textfield
  handleCookTimeChange(event) {
    this.totaltime = this.bakingtime + this.cooktime + this.preptime;
    this.setState({cooktime: event.target.value});
  }
  render(){
    return (
      <div className="App">
        <Navbar />
        <div className="header">
          <h1>Create a Recipe</h1>
        </div>

      <div className="centered">
        <form ref='uploadForm' id='uploadForm' action={serverAddress+"uploadRecipe"} method='post' encType="multipart/form-data">
          <label className="label-no-align">Upload an Image</label>

          <input type="file" 
            name="sampleFile"
            accept="image/png, image/jpeg"/>
          <br />
          <input 
            name="username"
            type="text"
            value={ReactSession.get("username")}
            hidden />
          <input 
            name="name"
            type="text"
            placeholder="Name"
            required
            minLength="3"
            maxLength="100" />
          <br />
          <textarea 
            name="description"
            minLength="20" maxLength="500"
            rows="5" cols="80"
            placeholder="Description"
            required >
          </textarea>
          <br />
          <textarea 
            name="directions"
            minLength="20" maxLength="500"
            rows="5" cols="80"
            placeholder="Directions"
            required >
          </textarea>  
          <br />

          {/* Table for serving size, total time, prep tim, and baking time. */}
          <table className="centered">
            <tbody>
              <tr>
                <th>Serving Size</th>
                <td>
                  <input 
                    name="servingsize"
                    type="number" min="1"
                    placeholder="?" className="createrecipeSmall"
                    onChange={this.handleServingSizeChange} value={this.state.servingsize}
                    required />
                </td>
                <th>Units</th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th>Amount per Serving</th>
                <td>
                  <input
                    name="amountperserving"
                    type="number" min="1"
                    placeholder="?" className="createrecipeSmall"
                    onChange={this.handleAmountPerServingChange} value={this.state.amountperserving}
                    required />
                </td>
                <td>
                  <select defaultValue="none"
                    name="amountperservingunit" >
                    <option value="none">none</option>
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
                    <input 
                      name="preptime"
                      type="number" min="0"
                      placeholder="?" className="createrecipeSmall"
                      onChange={this.handlePrepTimeChange} value={this.state.preptime}
                      required />
                  </th>
                  <td>
                    <select defaultValue="minutes"
                      name="preptimeunit" >
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
                    <input 
                      name="cooktime"
                      type="number" min="0"
                      placeholder="?" className="createrecipeSmall"
                      onChange={this.handleCookTimeChange} value={this.state.cooktime}
                      required />
                  </th>
                  <td>
                    <select defaultValue="minutes"
                      name="cooktimeunit" >
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
                    <input 
                      name="bakingtime"
                      type="number" min="0"
                      placeholder="?" className="createrecipeSmall"
                      onChange={this.handleBakingTimeChange} value={this.state.bakingtime}
                      required />
                  </th>
                  <td>
                    <select defaultValue="minutes"
                      name="bakingtimeunit" >
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                    </select> 
                  </td>
              </tr>
            </tbody>
          </table>

          {/* Dynamic table for adding ingredients, their measurements, and their measurement unit. */}
          <div>
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
                        <tr key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="ingredient"
                              onChange={e => this.handleChange(idx, e)}
                              className="ingredients" required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="measurement" min="0"
                              onChange={e => this.handleChange(idx, e)}
                              className="measurmentsandunits" required
                            />
                          </td>
                          <td>
                            <select 
                              name="units" 
                              onChange={e => this.handleChange(idx, e)}
                              defaultValue="none">
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
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}>
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
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="Submit"/>
        </form> 
      </div>
    </div>
  )}
}
export default CreateRecipe;