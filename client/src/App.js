import React from 'react';
import SignIn from './pages/Login.js'
import SignUp from './pages/Register.js'
import Navbar from './components/Navbar';
import Slideshow from './components/Slideshow'
import './App.css';
import Home from './pages/Home'
import { BrowserRouter as Router, Route} from "react-router-dom";
import NewProduct from './pages/NewProduct';
import Profile from './pages/Profile';
import EditSlideshow from './pages/EditSlideshow';
import EditShoes from './pages/EditShoes';

function App() {
  return(
    <Router>
       <Navbar/>
       <div>
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/newProduct" component={NewProduct} />
        <Route path="/editSlideshow" component={EditSlideshow} />
        <Route path="/editShoes" component={EditShoes} />
        
      </div>
    </Router>
  );
}

export default App;
