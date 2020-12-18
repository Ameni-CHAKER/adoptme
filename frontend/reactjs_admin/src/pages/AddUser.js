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
  FormText
} from 'reactstrap';

const axios = require('axios');

class AddUser extends Component {

    constructor(props){
        super(props)
        this.state={
          user:[],
          name:'',
          prename:'',
          username:'',
          email:'',
          address:'',
          tel:'',
          password:'',
          image:''
            
          };
      
    }

  
    add(){

      const data = new FormData()   /// data.append('file', this.state.file)    
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      data.append("nom", this.state.name)
      data.append("prenom", this.state.prename)
      data.append("username", this.state.username)
      data.append("email", this.state.email)
      data.append("address", this.state.address)
      data.append("tel", this.state.tel)
      data.append("password", this.state.password)
      data.append("image", this.state.image)

      axios.post("http://localhost:3000/users/addUserWithimage",data,config)
    
        .then(res =>{  // res== all categories
            console.log("User added", res.data);
            window.location.href='/'
  
        })
          
      }
      validate = (input) => {

        let isError = false;

        const errors = {

            nameErr: ''
      }

        const regex1 = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/

        if ( (input === '') || (input.length > 15) || !regex1.test(input)) {

            isError = true;

            errors.nameErr = 'veuillez verifier votre titre'

        }
        if (isError) {

            this.setState({

                ...this.state,

                ...errors

            })



        }

        this.setState({ erreur: isError })

        return isError;

    }


    handleChangeFile = event => {

      console.log("images", event.target.files[0].name);
  
      const image = event.target.files[0];
  
      this.setState({ image: image })
  
    };

  render() {
      return (
          <Page title="Add User" breadcrumbs={[{ name: 'Users', active: true }]} style={{ marginTop: '2rem'}} >
            <Col lg={11} md={12} sm={6} xs={12} >
                  <Card  style={{ marginLeft :"8rem",marginTop : "2rem" }} >
                  <CardBody>
                     <Form>
        
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Family Name</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Please enter User's new family name"
                          onChange={event => this.setState({name: event.target.value})}
                        />
                        
                          <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>First Name</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Please enter User's new first name"
                          onChange={event => this.setState({prename: event.target.value})}
                        />

                            <div style={{ fontSize: 13, color: "red" }}>

                            {this.state.nameErr}

                            </div>
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Username</Label>
                        <Input
                          type="text"
                          name="username"
                          placeholder="Please enter User's new username"
                          onChange={event => this.setState({username: event.target.value})}
                        />
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>
                      </FormGroup>
  
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Email</Label>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Please enter User's new email"
                          onChange={event => this.setState({email: event.target.value})}
                        />

                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>
                   
                      </FormGroup>
                      
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          name="address"
                          placeholder="Please enter User's new address"
                          onChange={event => this.setState({address: event.target.value})}
                        />
                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>
                   
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Phone number</Label>
                        <Input
                          type="text"
                          name="tel"
                          placeholder="Please enter User's new phone number"
                          onChange={event => this.setState({tel: event.target.value})}
                        />
                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>
                   
                      </FormGroup>

                      

                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Password</Label>
                        <Input
                          type="text"
                          name="password"
                          placeholder="Please enter User's new password"
                          onChange={event => this.setState({password: event.target.value})}
                        />

                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>


                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label >
                          Avatar
                        </Label>
                  
                          <Input
                          type="file" 
                          name="file"
                          onChange={this.handleChangeFile}
                           />
                          <FormText color="muted">
                           Profile picture 
                          </FormText>
                    
                      </FormGroup>
                   
                      </FormGroup>
                     
            
                       <FormGroup style={{ marginTop : "5rem" }}>
                          <Button style={{ paddingLeft : "3rem" ,paddingRight : "3rem" ,
                                           paddingTop : "1rem" ,paddingBottom : "1rem" }}
                                          onClick={(event)=>this.add(event)}  >
                              Add
                          
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

export default AddUser;