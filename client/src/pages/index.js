import React from "react";
import Navbar from '../components/Navbar';

const Home = () => {
	return (
		<div className='Home-component'>		
			{/*Imports navbar to the top of the page*/}
			<Navbar />
      <form>
        <div className="borderHome">
          <table className="centered">
            <tbody>
              <tr>
                {/* Drop down for search type */}
                <td>
                  <select
                    name="searchType" >
                    <option defaultValue value="recipeName">Recipe Name</option>
                    <option value="username">Username</option>
                  </select> 
                </td>

                {/* Input for search */}
                <td>
                  <input 
                  className="homeSearch"
                  name="searchText" 
                  type="text"
                  required
                  minLength="3"
                  maxLength="100" />
                </td>
                
                {/* Search button */}
                <td>
                  <input type="submit" value="Search"/>
                </td>
              </tr>
            </tbody>
          </table>
          

          
        </div>
      </form>
		</div>
	);
};

export default Home;