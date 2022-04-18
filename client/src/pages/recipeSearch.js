import "../App.css";
import React from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
const { serverAddress } = require('./config.json');

function RecipeSearch() {
  axios.post(serverAddress+"recipeSearch").then((res) => {
    console.log(JSON.stringify(res.data));
  });

  return (
    <div className="App">
      {/*Imports navbar to the top of the page*/}      
      <Navbar />
      <div className="header">
        <h1>Recipe Search</h1>
      </div>
    </div>
  );
};

export default RecipeSearch;