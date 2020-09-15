import React, {useState, useContext} from 'react';
import { withRouter } from 'react-router-dom';
import SlideshowServices from '../Services/SlideshowServices'
import Carousel from 'react-bootstrap/Carousel'
import './Slideshow.css';

class Slideshow extends React.Component {

    constructor(props){
        super(props);
        this.state = {images: []};
        this.getImages();
        
    }


    getImages = () => {
        SlideshowServices.getSlideshowImages().then(data=>{
            let i=0;
            let ret = [];
            console.log(data);
            for(i = 0; i < data.length; i++){
                if (data[i].show){ 
                    var arrayBufferView = new Uint8Array(data[i].image.data);
                    const blob = new Blob([arrayBufferView], {type:"image/jpeg"} );
                    const img = URL.createObjectURL(blob);
                    let result = {
                        data : img,
                        link : data[i].link,
                        contentType: data[i].image.contentType
                    }
                    URL.revokeObjectURL(img);

                    console.log(img);
                    ret.push(result);
                }
            }
            this.setState({images : ret})         
        });
    };






    render() {
        
        return (
            <Carousel>
                {this.state.images.map((item,i) =>
                    <Carousel.Item key={i}>
                        <a href={this.state.images[i].link}>
                        <img
                        className="d-block w-100"
                        src={this.state.images[i].data}
                        />
                        </a>
                    </Carousel.Item>
                )}
            </Carousel>
        )
    }
};

export default Slideshow;