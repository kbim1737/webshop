import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProductService from '../Services/ProductServices'
import SlideshowFrom from '../components/SlideshowForm'
import Slideshow from '../components/Slideshow'
import './NewProduct.css'


class NewProduct extends React.Component {

    constructor(props) {
        super(props);


    }


    static contextType = AuthContext;


    unauthenticated = () => {
        return(
            <div>
                Fuck off.
            </div>
        )
    }


    authenticated = () => {
        return(
            <>
            { this.context.user.role === "admin" ?
            <div>
            <Slideshow></Slideshow>
            <SlideshowFrom></SlideshowFrom> 
            </div>: null
            }
            </>
        )
    }

    render(){
        return(
            <div>       
                { this.context.isAuthenticated ? this.authenticated(): this.unauthenticated()  }
            </div>
        )
    }
};

export default NewProduct;