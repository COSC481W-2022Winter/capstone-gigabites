import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class CreateRecipe extends React.Component {
  render(){
    return (
      <div className="App">
        <div className="header">
          <h1>Create Recipe</h1>
        </div>
      </div>
    )
  }
}
export default CreateRecipe;