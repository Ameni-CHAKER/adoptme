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

class UpdatePetPage extends Component {

  constructor(props){
      super(props)
      this.state={
          pet:[],
          nom:'',
          race:'',
          age:'',
          description:'',
          category:[],
          owner:[],
          //image:''
        };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPetInfos()
  }

    update(event){

     // if (!err) {

        const data = new FormData()   /// data.append('file', this.state.file)    
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        data.append("nom", this.state.nom)
        data.append("race", this.state.race)
        data.append("age", this.state.age)
        data.append("description", this.state.description)
        data.append("categories", this.state.category)
        data.append("owner", this.state.owner)
        //data.append("image", this.state.image)

      axios.put("http://localhost:3000/pets/put/"+localStorage.getItem('idPet'),data,config)
      
      .then(res =>{  
          console.log("Pet updated", res.data);
          window.location.href='/updatePetPage'

      })
   // }
    }

    getPetInfos(){

            fetch('http://localhost:3000/pets/getPetById/'+localStorage.getItem('idPet'))
            .then(response => response.json())
            .then(res=>{
              console.log('res',res.data)
              this.setState({nom:res.data.nom,
                            race:res.data.race,
                            age:res.data.age,
                            description:res.data.description,
                            category:res.data.categories,
                            owner:res.data.owner,
                            image:res.data.image
                            })

            })
          
      }

   /*    validate = (input) => {

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
 */
  
  /*   handleChangeFile = event => {
   if(this.state.image !== undefined){
    console.log("images", event.target.files[0].name);
  
    const image = event.target.files[0];

    this.setState({ image: image })

  }
   }
 */
    

  render() {
      return (
          <Page title="Update Pet" breadcrumbs={[{ name: 'Pets', active: true }]} style={{ marginTop: '2rem'}} >
            <Col lg={11} md={12} sm={6} xs={12} >
                  <Card  style={{ marginLeft :"8rem",marginTop : "2rem" }} >
                  <CardBody>
                     <Form>
        
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Name</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Please enter pet's new name"
                          defaultValue={this.state.nom} 
                          onChange={event => this.setState({nom: event.target.value})}
                        />
                        
                          <div style={{ fontSize: 13, color: "red" }}>

{/*                           {this.state.nameErr}
 */}
                          </div>
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Race</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Please enter pet's new race"
                          defaultValue={this.state.race} 
                          onChange={event => this.setState({race: event.target.value})}
                        />

                            <div style={{ fontSize: 13, color: "red" }}>

                         

                            </div>
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Age</Label>
                        <Input
                          type="text"
                          name="age"
                          placeholder="Please enter User's new age"
                          defaultValue={this.state.age}
                          onChange={event => this.setState({age: event.target.value})}
                        />
                        <div style={{ fontSize: 13, color: "red" }}>

                         

                          </div>
                      </FormGroup>
  
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Description</Label>
                        <Input
                          type="text"
                          name="description"
                          placeholder="Please enter pet's new description"
                          defaultValue={this.state.description}
                          onChange={event => this.setState({description: event.target.value})}
                        />

                        
                        <div style={{ fontSize: 13, color: "red" }}>

{/*                           {this.state.nameErr}
 */}
                          </div>
                   
                      </FormGroup>
         {/*              
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Category</Label>
                        <Input
                          type="text"
                          name="category"
                          placeholder="Please enter pet's new category"
                          defaultValue={this.state.category}
                          onChange={event => this.setState({category: event.target.value})}
                        />
                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          </div>
                   
                      </FormGroup>
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Owner</Label>
                        <Input
                          type="text"
                          name="tel"
                          placeholder="Please enter pet's new owner"
                          defaultValue={this.state.owner}
                          onChange={event => this.setState({owner: event.target.value})}
                        />
                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          </div>
                   
                      </FormGroup>
 */}
                      {/* 

                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label>Password</Label>
                        <Input
                          type="text"
                          name="password"
                          placeholder="Please enter User's new password"
                          defaultValue={this.state.password}
                          onChange={event => this.setState({password: event.target.value})}
                        />

                        
                        <div style={{ fontSize: 13, color: "red" }}>

                          {this.state.nameErr}

                          </div>


                      </FormGroup>
                      */}
            {/* 
                      <FormGroup style={{ marginTop : "1rem" }}>
                        <Label >
                          Avatar
                        </Label>
                  
                          <Input
                          type="file" 
                          name="file"
                          defaultValue={this.state.image}
                          onChange={this.handleChangeFile} />
                          <FormText color="muted">
                           Pet picture 
                          </FormText>
                    
                      </FormGroup>
                    */}
                       <FormGroup style={{ marginTop : "5rem" }}>
                          <Button style={{ paddingLeft : "3rem" ,paddingRight : "3rem" ,
                                           paddingTop : "1rem" ,paddingBottom : "1rem" }}
                                          onClick={(event)=>this.update(event)}  >
                              Update
                          
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

export default UpdatePetPage;