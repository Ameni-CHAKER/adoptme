import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import axios from 'axios';

class CardPage extends React.Component {

  constructor(props){
    super(props)
    this.state={
        pets:[]
        
      }; 
}

componentDidMount(){
  this.getPets()
}

viewPetDetails(idPet){
  localStorage.setItem("idPet",idPet)
  window.location.href='/PetDetails'
}

getPets(event){
 
  axios.get('http://localhost:3000/pets/getPetByCat/' +localStorage.getItem('idCat'))
  .then(res => res.data)
  .then(res =>{  
    console.log('data', res.data);
    this.setState({ pets: res.data })
  })
    
}

  render() {
    const{pets} = this.state
  return (
    
    <Page title="Pets" breadcrumbs={[{ name: 'pets', active: true }]} >
      <Row >
      {
      pets.map((item,index) =>{ 
         //console.log('pet name --------->',item)
         return (

        <Col md={6} sm={6} xs={12} className="mb-3" key={index}>
     
          <Card className="flex-row"  >
            <CardImg
              className="card-img-left"
              src={`http://localhost:3000/getfile/${item.image}`}
              style={{ maxWidth:150,width: 'auto', height: 250 }}
            />
             <CardBody>
            <ListGroup flush>
              <ListGroupItem>{item.nom}</ListGroupItem>
              <ListGroupItem>{item.age}</ListGroupItem>
              <ListGroupItem>{item.description}</ListGroupItem>
            </ListGroup>
      
              <Button 
              style={{marginLeft:200,marginTop:23,color:'primary'}} 
              outline 
              color="primary"
              onClick={(event) => this.viewPetDetails(item._id)}>
                  View details
              </Button>

            </CardBody>
   
          </Card>
           
        </Col>
    
  )})}

       {/*  <Col md={6} sm={6} xs={12} className="mb-3">
          <Card className="flex-row">
            <CardBody>
              <CardTitle>Sisi</CardTitle>
              <CardText> Adopt me !</CardText>
            </CardBody>
            <CardImg
              className="card-img-right"
              src={bg3Image}
              style={{ width: 'auto', height: 150 }}
            />
          </Card>
        </Col> */}

      </Row>   
    </Page>
   
  );
};
}
export default CardPage;
