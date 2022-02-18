import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Profile from './pages/profile';
import SignUp from './pages/signup';

  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/profile' element={<Profile/>} />
    </Routes>
    </Router>
);
}
  export default App;