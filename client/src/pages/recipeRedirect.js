import "../App.css";
import React,{ useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { getlastRecipe } = require('./config.json');  

function RecipeRedirect(){
    const [RecipeID, setRecipeID] = useState(null);

    useEffect(() => {

        axios.post(`${getlastRecipe}`, {
            username: ReactSession.get("username")
        }).then((res) => {
            if(res.data === false)
                console.log("Unable to find that username in recipe table");
            else
            {
                console.log(res.data);
                setRecipeID(res.data[0]._id);

                ReactSession.set("recipeName0",res.data[0].name);
                ReactSession.set("recipeImage0", res.data[0].recipePicture+"."+res.data[0].recipePictureEXT);
                ReactSession.set("recipeDescription0", res.data[0].description);
                ReactSession.set("recipeDirections0",res.data[0].directions);
                ReactSession.set("recipeServingSize0",res.data[0].servingsize);
                ReactSession.set("recipeTotalTime0",res.data[0].totaltime);
                ReactSession.set("recipePrepTime0",res.data[0].preptime);
                ReactSession.set("recipeBakingTime0",res.data[0].bakingtime);
            }
            }).catch(err => {
                console.log(err);
                alert("Error on EditProfile redirect page");
            });
    }, []);

    let finalURL = '../recipe/'+RecipeID;
    return (
        <div>
            <Navigate to={finalURL} />
        </div>
    );
}
export default RecipeRedirect;