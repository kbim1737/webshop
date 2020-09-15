import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProductService from '../Services/ProductServices'
import SlideshowService from '../Services/SlideshowServices'
import '../pages/NewProduct.css'

class NewProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                    link:'',
                    photo:{
                        contentType:null,
                        data:null
                    }}

    
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const slideShowImage = {
            image: this.state.photo,
            link: this.state.link
        };

        SlideshowService.saveImage(slideShowImage).then(data=>{
            const { message } = data;
            console.log(message);
            if(!message.msgError){
                console.log("minden zsiir");
            }
        });
    }

    handleLink = (event) => {
        this.setState({link: event.target.value});
    };


    handlePhoto = (event) => {
        const photo = this.state.photo;
        photo.contentType = event.target.files[0].type;
        photo.data = URL.createObjectURL(event.target.files[0]);
        console.log(photo);
        this.setState({photo : photo});  
    };

     


    render(){
        return(
            <div className="upload-form">       
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="modelCode">
                        <Form.Label>Link</Form.Label>
                        <Form.Control onChange={this.handleLink} type="text" placeholder="Link" />
                    </Form.Group>
                    <Form.Group>
                        <Form.File onChange={this.handlePhoto} id="image1" label="photo1" accept='image/*' />
                    </Form.Group>
                    <Button  id="upload-button" className="upload-button" variant="primary" type="submit">
                        Incarcare
                    </Button>
                </Form> 
            </div>
        )
    }
};

export default NewProduct;