import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProductService from '../Services/ProductServices'
import './NewProduct.css'


class NewProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {ok36:false, ok37:false, ok38:false, ok39:false, ok40:false, ok41:false, ok42:false, ok43:false, ok44:false, ok45:false};
        this.state = {  number36:0,
                        number37:0,
                        number38:0,
                        number39:0,
                        number40:0,
                        number41:0,
                        number42:0,
                        number43:0,
                        number44:0,
                        number45:0 };
        this.state = {modelCode:'', gender:'Barbati', brand:'',color:'Alb', description:'', kind:'Papuci', price:'',
                    photo1:{
                        contentType:null,
                        data:null
                    }, 
                    photo2:{
                        contentType:null,
                        data:null
                    }, 
                    photo3:{
                        contentType:null,
                        data:null
                    }};

        this.handleOk36 = this.handleOk36.bind(this);
        this.handleOk37 = this.handleOk37.bind(this);
        this.handleOk38 = this.handleOk38.bind(this);
        this.handleOk39 = this.handleOk39.bind(this);
        this.handleOk40 = this.handleOk40.bind(this);
        this.handleOk41 = this.handleOk41.bind(this);
        this.handleOk42 = this.handleOk42.bind(this);
        this.handleOk43 = this.handleOk43.bind(this);
        this.handleOk44 = this.handleOk44.bind(this);
        this.handleOk45 = this.handleOk45.bind(this);

        this.handleNumber36 = this.handleNumber36.bind(this);
        this.handleNumber37 = this.handleNumber37.bind(this);
        this.handleNumber38 = this.handleNumber38.bind(this);
        this.handleNumber39 = this.handleNumber39.bind(this);
        this.handleNumber40 = this.handleNumber40.bind(this);
        this.handleNumber41 = this.handleNumber41.bind(this);
        this.handleNumber42 = this.handleNumber42.bind(this);
        this.handleNumber43 = this.handleNumber43.bind(this);
        this.handleNumber44 = this.handleNumber44.bind(this);
        this.handleNumber45 = this.handleNumber45.bind(this);
        this.handlePhoto1 = this.handlePhoto1.bind(this);
        this.handlePhoto2 = this.handlePhoto2.bind(this);
        this.handlePhoto3 = this.handlePhoto3.bind(this);
        this.handleKind = this.handleKind.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    static contextType = AuthContext;


    unauthenticated = () => {
        return(
            <div>
                Fuck off.
            </div>
        )
    }



    handleOk36 = () =>{
        if (this.state.ok36)
            this.setState({ok36 : false});
        else
            this.setState({ok36 : true});
    }

    handleOk37 = () =>{
        if (this.state.ok37)
            this.setState({ok37 : false});
        else
            this.setState({ok37 : true});
    }

    handleOk38 = () =>{
        if (this.state.ok38)
            this.setState({ok38 : false});
        else
            this.setState({ok38 : true});
    }

    handleOk39 = () =>{
        if (this.state.ok39)
            this.setState({ok39 : false});
        else
            this.setState({ok39 : true});
    }

    handleOk40 = () =>{
        if (this.state.ok40)
            this.setState({ok40 : false});
        else
            this.setState({ok40 : true});
    }



    handleOk41 = () =>{
        if (this.state.ok41)
            this.setState({ok41 : false});
        else
            this.setState({ok41 : true});
    }



    handleOk42 = () =>{
        if (this.state.ok42)
            this.setState({ok42 : false});
        else
            this.setState({ok42 : true});

    }

    handleOk43 = () =>{
        if (this.state.ok43)
            this.setState({ok43 : false});
        else
            this.setState({ok43 : true});
    }

    handleOk44 = () =>{
        if (this.state.ok44)
            this.setState({ok44 : false});
        else
            this.setState({ok44 : true});
    }

    handleOk45 = () =>{
        if (this.state.ok45)
            this.setState({ok45 : false});
        else
            this.setState({ok45 : true});
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state.number36);
        const shoe = {
            code: this.state.modelCode,
            brand: this.state.brand,
            color: this.state.color,
            kind: this.state.kind,
            gender: this.state.gender,
            sizes: [{size:36,quantity:this.state.number36? this.state.number36:"0"}, 
                    {size:37,quantity:this.state.number37? this.state.number37:"0"}, 
                    {size:38,quantity:this.state.number38? this.state.number38:"0"}, 
                    {size:39,quantity:this.state.number39? this.state.number39:"0"}, 
                    {size:40,quantity:this.state.number40? this.state.number40:"0"}, 
                    {size:41,quantity:this.state.number41? this.state.number41:"0"}, 
                    {size:42,quantity:this.state.number42? this.state.number42:"0"}, 
                    {size:43,quantity:this.state.number43? this.state.number43:"0"}, 
                    {size:44,quantity:this.state.number44? this.state.number44:"0"}, 
                    {size:45,quantity:this.state.number45? this.state.number45:"0"}], 
            images: [this.state.photo1, this.state.photo2, this.state.photo3],
            description: this.state.description,
            price: this.state.price
        };
        ProductService.saveShoe(shoe).then(data=>{
            const { message } = data;
            console.log(message);
            if(!message.msgError){
                console.log("minden zsiir");
            }
        });
    }

    handleBrand = (event) => {
        this.setState({brand: event.target.value});
    };

    handleModelCode = (event) => {
        this.setState({modelCode: event.target.value});
    };

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    };

    handleKind = (event) => {
        this.setState({kind: event.target.value});
    };

    handleColor = (event) => {
        this.setState({color: event.target.value});
    };

    handleGender = (event) => {
        this.setState({gender: event.target.value});
        console.log(event.target.value);
       // console.log(this.state.gender);
    };

    
    handlePrice = (event) => {
        this.setState({price: event.target.value});
    };

    handlePhoto1 = (event) => {
        const photo = this.state.photo1;
        photo.contentType = event.target.files[0].type;
        photo.data = URL.createObjectURL(event.target.files[0]);
        console.log(photo);
        this.setState({photo1 : photo});  
    };

    handlePhoto2 = (event) => {
        const photo = this.state.photo1;
        photo.contentType = event.target.files[0].type;
        photo.data = URL.createObjectURL(event.target.files[0]);
        console.log(photo);
        this.setState({photo2 : photo});  
    };

    handlePhoto3 = (event) => {
        const photo = this.state.photo1;
        photo.contentType = event.target.files[0].type;
        photo.data = URL.createObjectURL(event.target.files[0]);
        console.log(photo);
        this.setState({photo3 : photo});  
    };

    handleNumber36 = (event) => {
        this.setState({number36: event.target.value});
    };

    handleNumber37 = (event) => {
        this.setState({number37: event.target.value});
    };

    handleNumber38 = (event) => {
        this.setState({number38: event.target.value});
    };

    handleNumber39 = (event) => {
        this.setState({number39: event.target.value});
    };

    handleNumber40 = (event) => {
        this.setState({number40: event.target.value});
    };

    handleNumber41 = (event) => {
        this.setState({number41: event.target.value});
    };

    handleNumber42 = (event) => {
        this.setState({number42: event.target.value});
    };

    handleNumber43 = (event) => {
        this.setState({number43: event.target.value});
    };

    handleNumber44 = (event) => {
        this.setState({number44: event.target.value});
    };

    handleNumber45 = (event) => {
        this.setState({number45: event.target.value});
    };




    authenticated = () => {
        return(
            <>
            { this.context.user.role === "admin" ?
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="modelCode">
                    <Form.Label>Cod model</Form.Label>
                    <Form.Control onChange={this.handleModelCode} type="text" placeholder="Cod model" />
                </Form.Group>

                <Form.Group controlId="modelBrand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control onChange={this.handleBrand} type="text" placeholder="Marca" />
                </Form.Group>
                <Form.Group controlId="gender">
                    <Form.Label>Pentru</Form.Label>
                    <Form.Control as="select" onChange={this.handleGender} value={this.state.gender}  placeholder="Pentru">
                        <option value="Barbati">Barbati</option>
                        <option value="Femei">Femei</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="kind">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control onChange={this.handleKind} value={this.state.kind} placeholder="Tip" as="select">
                        <option value="Papuci">Papuci</option>
                        <option value="Botine">Botine</option>
                        <option value="Cizme">Cizme</option>
                        <option value="Sandale">Sandale</option>
                        <option value="Gehete">Ghete</option>
                        <option value="Pantofi">Pantofi</option>
                        <option value="Pantofi sport">Pantofi sport</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="color">
                    <Form.Label>Culoare</Form.Label>
                    <Form.Control onChange={this.handleColor} value={this.state.color} as="select">
                        <option value="Alb">Alb</option>
                        <option value="Albastru">Albastru</option>
                        <option value="Argintiu">Argintiu</option>
                        <option value="Auriu">Auriu</option>
                        <option value="Bej">Bej</option>
                        <option value="Colorat">Colorat</option>
                        <option value="Galben">Galben</option>
                        <option value="Gri">Gri</option>
                        <option value="Maro">Maro</option>
                        <option value="Negru">Negru</option>
                        <option value="Rosu">Rosu</option>
                        <option value="Roz">Roz</option>
                        <option value="Verde">Verde</option>
                    </Form.Control>
                </Form.Group>
                <Form.Label>Marimi</Form.Label>
                <Form.Group controlId="formBasicCheckbox36">
                    <Form.Check onClick={this.handleOk36} type="checkbox" label="36" />
                    {this.state.ok36 === true ?
                        <Form.Control onChange={this.handleNumber36} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox37">
                    <Form.Check onClick={this.handleOk37} type="checkbox" label="37" />
                    {this.state.ok37 === true ?
                        <Form.Control onChange={this.handleNumber37} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox38">
                    <Form.Check onClick={this.handleOk38} type="checkbox" label="38" />
                    {this.state.ok38 === true ?
                        <Form.Control onChange={this.handleNumber38} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox39">
                    <Form.Check onClick={this.handleOk39} type="checkbox" label="39" />
                    {this.state.ok39 === true ?
                        <Form.Control onChange={this.handleNumber39} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox40">
                    <Form.Check onClick={this.handleOk40} type="checkbox" label="40" />
                    {this.state.ok40 === true ?
                        <Form.Control onChange={this.handleNumber40} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox41">
                    <Form.Check onClick={this.handleOk41} type="checkbox" label="41" />
                    {this.state.ok41 === true ?
                        <Form.Control onChange={this.handleNumber41} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox42">
                    <Form.Check onClick={this.handleOk42} type="checkbox" label="42" />
                    {this.state.ok42 === true ?
                        <Form.Control onChange={this.handleNumber42} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox43">
                    <Form.Check onClick={this.handleOk43} type="checkbox" label="43" />
                    {this.state.ok43 === true ?
                        <Form.Control onChange={this.handleNumber43} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox44">
                    <Form.Check onClick={this.handleOk44} type="checkbox" label="44" />
                    {this.state.ok44 === true ?
                        <Form.Control onChange={this.handleNumber44} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox45">
                    <Form.Check onClick={this.handleOk45} type="checkbox" label="45" />
                    {this.state.ok45 === true ?
                        <Form.Control onChange={this.handleNumber45} type = "number" placeholder="Cate perechi?"/> :null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.File onChange={this.handlePhoto1} id="image1" label="photo1" accept='image/*' />
                    <Form.File onChange={this.handlePhoto2} id="image2" label="photo2" accept='image/*' />
                    <Form.File onChange={this.handlePhoto3} id="image3" label="photo3" accept='image/*' />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descriere</Form.Label>
                    <Form.Control onChange={this.handleDescription}  as="textarea" rows="5" placeholder="Descriere" />
                </Form.Group>
                <Form.Group controlId="modelPrice">
                    <Form.Label>Pret</Form.Label>
                    <Form.Control onChange={this.handlePrice} type="text" placeholder="Pret" />
                </Form.Group>
                <Button  id="upload-button" className="upload-button" variant="primary" type="submit">
                    Incarcare
                </Button>
            </Form> : null
            }
            </>
        )
    }

    render(){
        return(
            <div className="upload-form">       
                { this.context.isAuthenticated ? this.authenticated(): this.unauthenticated()  }
            </div>
        )
    }
};

export default NewProduct;