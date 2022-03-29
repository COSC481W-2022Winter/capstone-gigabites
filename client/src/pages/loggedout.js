import React from "react";
import { Navigate } from 'react-router-dom';

const LoggedOut = () => {
	return (
        <div>
          <Navigate to="../" />
        </div>
	);
};

export default LoggedOut;