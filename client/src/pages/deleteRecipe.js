import "../App.css";
import React, { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom";
const { serverAddress } = require('./config.json');

function DeleteRecipe() {
  const [isLoading, setLoading] = useState(true);
  const {RecipeID} = useParams();
  
  ReactSession.set("recipeID",RecipeID);

  useEffect(() => {

    axios.post(serverAddress + "performDelete", {
      id: ReactSession.get("recipeID")
    }).then((res) => {

        if (res.data === false) {
            console.log("False reply from database on recipe page");
        } else {
            var output = res.data;
            console.log(output);
        }
      setLoading(false);
    })
      .catch((err) => console.log("deleteRecipe.js error: " + err));// eslint-disable-next-line
  }, []);
  if (isLoading) {
    return (
        <div className="App">Loading...</div>
    );
  }
  else
  {
    return (
      <div className="App">
        <Navigate to='../explore' />
      </div>
    )
  }
}
export default DeleteRecipe;