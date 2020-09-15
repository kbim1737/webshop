import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Slideshow from '../components/Slideshow'

const Home = withRouter(props => {

    return(
        <div>
            <Slideshow></Slideshow>
            
        </div>
    )
});

export default Home;