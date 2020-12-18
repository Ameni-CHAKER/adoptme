import React, { Component } from 'react';
import Page from '../components/Page';

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

const axios = require('axios');

class DeleteCategory extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            
          };
      
    }



      Delete(){
      axios.post("http://localhost:3000/categories/delete/"`$id`, {

        nomCategory:this.state.name,
  
        })
    
        .then(res =>{  
            console.log("Category deleted", res.data);
            window.location.href='categories'
  
        })
          
      }


    render() {
        return (
            <Page title="Delete Category" breadcrumbs={[{ name: 'Categories', active: true }]} style={{ marginTop: '2rem'}} >
              <Col lg={11} md={12} sm={6} xs={12} >
                    <Card  style={{ marginLeft :"8rem",marginTop : "2rem" }} >
              
                    <CardBody>
                      <Form>
                    
                        <FormGroup style={{ marginTop : "1rem" }}>
                          <Label>Name</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Please enter Category's name"
                            onChange={event => this.setState({name: event.target.value})}
                          />
                        </FormGroup>
                  
                
    
              
                        
                        
                       
                        {/* <FormGroup>
                          <Label >Number</Label>
                          <Input
                            type="number"
                            name="number"
                            id="exampleNumber"
                            placeholder="Please enter pet's total"
                          />
                        </FormGroup> */}
                       
                       {/*  <FormGroup style={{ marginTop : "2rem" }}>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                          />
                        </FormGroup>
                        <FormGroup style={{ marginTop : "2rem" }}>
                          <Label>Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup >
                        <FormGroup style={{ marginTop : "2rem" }}>
                          <Label>Color</Label>
                          <Input
                            type="color"
                            name="color"
                            id="exampleColor"
                            placeholder="color placeholder"
                          />
                        </FormGroup>
                     */}
                       {/*  <FormGroup>
                          <Label>Description</Label>
                          <Input 
                          type="textarea" 
                          name="text" 
                          placeholder="color placeholder"
                          />
                        </FormGroup> */}

                       {/*  <FormGroup check  style={{ marginTop : "2rem" }}>
                          <Label check>
                            <Input type="radio" /> Option one is this and that—be sure
                            to include why it's great
                          </Label>
                        </FormGroup>
                        <FormGroup check  style={{ marginTop : "2rem" }}>
                          <Label check>
                            <Input type="checkbox" /> Check me out
                          </Label>
                        </FormGroup>
                        
                       
                        */}
                         <FormGroup style={{ marginTop : "5rem" }}>
                            <Button style={{ paddingLeft : "3rem" ,paddingRight : "3rem" ,
                                             paddingTop : "1rem" ,paddingBottom : "1rem" }}
                                             onClick={(event)=>this.add(event)}  >
                                Delete
                            
                            </Button>
                          </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
        
        
              
            </Page>
          );
    }
}

export default DeleteCategory;