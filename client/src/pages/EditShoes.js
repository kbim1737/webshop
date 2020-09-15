import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductServices from '../Services/ProductServices';
import { AuthContext } from '../Context/AuthContext';
import EditShoeModal from '../components/EditShoeModal';
import './EditShoes.css'





class EditShoes extends React.Component {

    constructor(props) {
        super(props);
        this.state={shoes: [], editShoeID: 0, showModal: false, shoe:{}};
        this.getShoes();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }




    static contextType = AuthContext;




    getShoes = () =>{
        ProductServices.getShoes().then(data=>{
            let i=0;
            let ret = [];
            for(i = 0; i < data.length; i++){
                let result = {
                    brand: data[i].brand,
                    code: data[i].code,
                    color: data[i].color,
                    gender: data[i].gender,
                    images: data[i].images,
                    kind: data[i].kind,
                    newPrice: data[i].newPrice,
                    sizes: data[i].sizes,
                    price: data[i].price
                }
                ret.push(result);

            }
            this.setState({shoes : ret});   
        });
    }

    delete = (event) => {
        console.log(event.target.value);
        const shoe = {
            code: event.target.value,
        };
        ProductServices.deleteShoe(shoe).then(data=>{
            const { message } = data;
            console.log(message);
            if(!message.msgError){
                console.log("minden zsiir");
            }
        });

        this.getShoes();
    }


    edit = (event) => {
        console.log(event.target.value);
        this.setState({shoe : this.state.shoes[event.target.value]}, () => { this.setState({showModal : true})});
    }



    unauthenticated = () => {
        return(
            <div>
                Fuck off.
            </div>
        )
    }

    authenticated = () => {
        
        const numberOfRows = Math.ceil(this.state.shoes.length / 4);

        return(
            <>
            { this.context.user.role === "admin" ?
            <Container>
                {Array(numberOfRows).fill().map((_, rowIndex) => (
                <Row key={rowIndex} id="row" >
                {this.state.shoes.slice(rowIndex * 4, (rowIndex *4) + 4).map((item,i) =>
                <Col key={i} xs="11" sm="3">
                   <Card key={i} className="text-center" border="dark" style={{ width: '13rem' }}>
                        <Card.Img variant="top" src={require('./cipo.jpg')} />
                        <Card.Body>
                            <Card.Title>{this.state.shoes[i].brand}</Card.Title>
                            <Card.Text>
                            cod:{this.state.shoes[i].code}
                            </Card.Text>
                            <Button id="adminShoeButton" value={i} onClick={this.edit}>Edit</Button>
                            <Button id="adminShoeButton" value={this.state.shoes[i].code} onClick={this.delete} >Delete</Button>
                        </Card.Body>
                    </Card>
                 </Col>
                )}
                </Row>
                ))}
            </Container>: null
            }
            </>
        )
    }

    render(){
        return(
            <div>       
                { this.context.isAuthenticated ? this.authenticated(): this.unauthenticated()  }
                <EditShoeModal
                    show={this.state.showModal}
                    onHide={() => this.setState({showModal: false})}
                    shoe={this.state.shoe}
                />
            </div>
        )
    }
};

export default EditShoes;