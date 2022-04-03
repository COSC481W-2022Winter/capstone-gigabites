import "../App.css";
import React from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { getUser } = require('./config.json');  

axios.post(`${getUser}`, {
    username: ReactSession.get("username")
}).then((res) => {
    if(res.data === false)
        console.log("");
    else
    {
        ReactSession.set("fromEditProfile", true);
        ReactSession.set("bio", res.data.bio);
        ReactSession.set("email", res.data.email);
        ReactSession.set("question", res.data.question);
        ReactSession.set("answer", res.data.answer);
        var out = res.data.profilePicture+"."+res.data.profilePictureEXT
        ReactSession.set("profilePicture", out);
    }
    }).catch(err => {
        console.log(err);
        alert("Error on EditProfile redirect page");
        });

 class EditProfileTransition extends React.Component {
    render()
    {
        let finalURL = '../profile/'+ReactSession.get('username');
        return(
            <div>
                <Navigate to={finalURL} />
            </div>
        );
	}
}
export default EditProfileTransition;