import React, {useState,useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import ProductService from '../Services/ProductServices';



class EditShowModal extends React.Component {
    
    constructor(props){
        super(props); 
        this.state = {code:null, gender:null, brand:null,color:null, description:null, kind:null, price:null, newPrice:null, sizes:this.props.sizes}
        this.handleSize = this.handleSize.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSize = (i,value) =>{
        console.log(value);
        console.log(i);
        let sizes = [];
        if(!this.state.sizes){
            sizes =  this.props.shoe.sizes;
        } else {
            sizes = this.state.sizes;
        }
        sizes[i].quantity = value;
        this.setState({sizes: sizes});
    }


    handleSubmit = (event) =>{
        event.preventDefault();
        const shoe = {
            code: this.state.modelCode ? this.state.modelCode : this.props.shoe.code,
            brand: this.state.brand ? this.state.brand : this.props.shoe.brand,
            color: this.state.color ?  this.state.color : this.props.shoe.color,
            kind: this.state.kind ?  this.state.kind : this.props.shoe.kind,
            gender: this.state.gender ? this.state.gender:this.props.shoe.gender,
            sizes: this.state.sizes ?  this.state.sizes:this.props.shoe.sizes,
            description: this.state.description ? this.state.description : this.props.shoe.description,
            price: this.state.price ? this.state.price : this.props.shoe.price,
            newPrice: this.state.newPrice ? this.state.newPrice: this.props.shoe.newPrice
        };
        ProductService.updateShoe(shoe).then(data=>{
            const { message } = data;
            console.log(message);
            if(!message.msgError){
                console.log("minden zsiir");
            }
        });
    }


    render(){
        return (
        <Modal
            show = {this.props.show}
            onHide = {this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit shoe
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="modelCode">
                    <Form.Label>Cod model</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({code: event.target.value })}} type="text" placeholder={this.props.shoe.code} />
                </Form.Group>

                <Form.Group controlId="modelBrand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({brand: event.target.value })}} type="text"  placeholder={this.props.shoe.brand} />
                </Form.Group>
                <Form.Group controlId="gender">
                    <Form.Label>Pentru</Form.Label>
                    <Form.Control as="select" onChange={(event)=>{this.setState({gender: event.target.value })}}  placeholder={this.props.shoe.gender}>
                        <option value="Barbati">Barbati</option>
                        <option value="Femei">Femei</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="kind">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({kind: event.target.value })}}  placeholder={this.props.shoe.kind} as="select">
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
                    <Form.Control onChange={(event)=>{this.setState({color: event.target.value })}}  placeholder={this.props.shoe.color} as="select">
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

                    {this.props.shoe.sizes ? this.props.shoe.sizes.map((item, i) =>
                    <>
                    <Form.Label key={(i+1)*100}>{item.size}</Form.Label>
                    <Form.Control key={i} onChange={(event) => {this.handleSize(i,event.target.value)}} number={i} type="number" placeholder={item.quantity}/>
                    </>
                ): null}
                </Form.Group>  
                <Form.Group>
                    <Form.File onChange={this.handlePhoto1} id="image1" label="photo1" accept='image/*' />
                    <Form.File onChange={this.handlePhoto2} id="image2" label="photo2" accept='image/*' />
                    <Form.File onChange={this.handlePhoto3} id="image3" label="photo3" accept='image/*' />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descriere</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({description: event.target.value })}} placeholder={this.props.shoe.description} as="textarea" rows="5"  />
                </Form.Group>
                <Form.Group controlId="modelPrice">
                    <Form.Label>Pret</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({price: event.target.value })}} placeholder={this.props.shoe.price} type="text"  />
                </Form.Group>
                <Form.Group controlId="modelPrice">
                    <Form.Label>Pret nou</Form.Label>
                    <Form.Control onChange={(event)=>{this.setState({newPrice: event.target.value })}}  placeholder={this.props.shoe.newPrice} type="text" />
                </Form.Group>
                <Button  id="upload-button" className="upload-button" variant="primary" type="submit">
                    Incarcare
                </Button>
            </Form>
            
            
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default EditShowModal;