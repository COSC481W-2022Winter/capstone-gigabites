import "../App.css";
import React from "react";
import { render } from "react-dom";
import { ReactSession } from 'react-client-session';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

{/* 
  Credit
  Forms: https://reactjs.org/docs/forms.html
  Place holder(hints): https://stackoverflow.com/a/3612949/17413708
  Text area: https://stackoverflow.com/a/2528061/17413708
  Dynamic table for ingredients and helper functions: 
   https://stackoverflow.com/a/49174689/17413708
*/}

class CreateRecipe extends React.Component {
  state = {
    rows: [{}]
  };
  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };
  handleAddRow = () => {
    const item = {
      Ingredients: "",
      Measurement: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Create a Recipe</h1>
        </div>

        <form>
          <label className="label-no-align">Upload an Image</label>
          <input type="file" 
            id="image" name="image" 
            accept="image/png, image/jpeg" />
          <br />
          <input 
            name="name"
            type="text"
            placeholder="Name"
            required />
          <br />
          <textarea 
            rows="5" cols="80"
            id="description"
            placeholder="Description"
            required />
          <br />
          <textarea 
            rows="5" cols="80"
            id="directions"
            placeholder="Directions"
            required />
          <br />

          {/* Table for serving size, total time, prep tim, and baking time. */}
          <table>
            <tbody>
              <tr>
                <th>Serving Size</th>
                <td>
                  <input 
                    name="servingSize"
                    type="number"
                    placeholder="?"
                    required />
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th>Total Time</th>
                  <th>
                    <input 
                      name="totalTime"
                      type="number"
                      placeholder="?"
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
                      placeholder="?"
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
                      placeholder="?"
                      required />
                  </th>
              </tr>
            </tbody>
          </table>

          {/* Dynamic table for adding ingredients and their measurements and measurement unit. */}
          <div>
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 column">
                  <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                  >
                    <thead>
                      <tr>
                        <th className="text-center"> # </th>
                        <th className="text-center"> Ingredients </th>
                        <th className="text-center"> Measurements </th>
                        <th />
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
                              value={this.state.rows[idx].name}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="measurement"
                              value={this.state.rows[idx].mobile}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
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
          </div>

          <input type="submit" value="Submit" />


        </form> 
      </div>
    )
  }
}
export default CreateRecipe;