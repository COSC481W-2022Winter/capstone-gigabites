import "../App.css";
import React,{ useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { getlastRecipe } = require('./config.json');

function RecipeRedirect() {
	const [isLoading, setLoading] = useState(true);

	  useEffect(() => {
        axios.post(`${getlastRecipe}`, {
            username: ReactSession.get("username")
        }).then((res) => {
            if(res.data === false)
                console.log("Unable to find that username in recipe table!");
            else
            {
                ReactSession.set("recipeID0",res.data[0]._id);
                ReactSession.set("Number",0);
                ReactSession.set("recipeName0",res.data[0].name);
                ReactSession.set("recipeImage0", res.data[0].recipePicture+"."+res.data[0].recipePictureEXT);
                ReactSession.set("recipeDescription0", res.data[0].description);
                ReactSession.set("recipeDirections0",res.data[0].directions);
                ReactSession.set("recipeServingSize0",res.data[0].servingsize);
                ReactSession.set("recipeTotalTime0",res.data[0].totaltime);
                ReactSession.set("recipePrepTime0",res.data[0].preptime);
                ReactSession.set("recipeBakingTime0",res.data[0].bakingtime);
                ReactSession.set("recipeCookTime0",res.data[0].cooktime);
                ReactSession.set("recipePrepTimeUnits0",res.data[0].preptimeunit);
                ReactSession.set("recipeCookTimeUnits0",res.data[0].cooktimeunit);
                ReactSession.set("recipeBakingTimeUnits0",res.data[0].bakingtimeunit);
                ReactSession.set("amountPerServing0",res.data[0].amountperserving);
                ReactSession.set("amountPerServingUnits0",res.data[0].amountperservingunit);
                ReactSession.set("fromCreateRecipe",true);
                setLoading(false);
            }
            }).catch(err => {
                console.log(err);
                alert("Error on recipeRedirect page");
            });
	}, []);
  
	if (isLoading) {
	  return <div className="App">Loading...</div>;
	}

    let finalURL = '../recipe/'+ReactSession.get("recipeID0");
	return (
		<div className="App">
			<Navigate to={finalURL} />
		</div>);
};

export default RecipeRedirect;