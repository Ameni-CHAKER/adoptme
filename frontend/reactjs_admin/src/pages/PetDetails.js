import bg1Image from '../assets/img/bg/background_640-1.jpg';
import bg3Image from '../assets/img/bg/background_640-3.jpg';
import Page from '../components/Page';
import userImage from '../assets/img/users/profile.png';
import ReactImageMagnify from 'react-image-magnify';

import React from 'react';
import {
  Card,
  Row,
  Button
} from 'reactstrap';
import axios from 'axios';
import { name } from 'faker';

class CardPage extends React.Component {

  constructor(props){
    super(props)
    this.state={
        //pet info
        pet:[],
        nom:'',
        race:'',
        age:'',
        sexe:'',
        decription:'',
        owner:[],
        cat:'',
        image:'profile.png',
        //owner info
       
      }; 
}

componentDidMount(){
  window.scrollTo(0, 0);
  this.getPetById();
  
}


deletePet(){
  axios.post("http://localhost:3000/pets/deletePetById/" +localStorage.getItem("idPet"))

    .then(res =>{  
        console.log("Pet deleted", res.data);
        window.location.href='/pet'

    })

  }
  updatePet(event){
    event.preventDefault()
    window.location.href='/updatePetPage'
  }

getOwnerById(owner){

  console.log('------------>', owner.nom + owner.availability)
 /*  fetch('http://localhost:3000/owners/getOwnerById/'+owner)
  .then(response => response.json())
  .then(res=>{
    console.log('owner -> ',res.data)
     this.setState({ ownerInfo:res.data
                  }) 
 
  }) */
 
}

getPetById(event){
 
  axios.get('http://localhost:3000/pets/getPetById/' +localStorage.getItem("idPet"))
  .then(res => res.data)
  .then(res =>{  
    console.log('data', res.data);
    this.setState({ nom:res.data.nom,
                    race:res.data.race,
                    age:res.data.age,
                    sexe:res.data.sexe,
                    description:res.data.description,
                    cat:res.data.categories,
                    owner:res.data.owner,
                    image:res.data.image})

    this.getOwnerById(res.data.owner);

  })



    
}

  render() {
    const {nom,race,age,description,sexe,image,owner}=this.state

  return (
    
    <Page title="One Pet" breadcrumbs={[{ name: 'Categories / Pets', active: true }]} >
      <Row   
       style={{
          height: '60vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
     
      <Card >
        <div className="row no-gutters" >
          <aside className="col-sm-5 border-right">
          <article className="p-5">
            <div >
              <img
                className="main-img d-md-none"
                 src={`http://localhost:3000/getfile/${image}`}

              />
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "adopt me",
                    isFluidWidth: true,
                    src:`http://localhost:3000/getfile/${image}`,
                  },
                  largeImage: {
                    src: `http://localhost:3000/getfile/${image}`,
                    width: 1100,
                    height: 1100,
                  },
                  enlargedImageContainerStyle: {
                    zIndex: 9,
                    backgroundColor: 'white',
                    objectFit: 'cover',
                  },
                  enlargedImageContainerDimensions: {
                    width: '160%',
                    height: '130%',
                  },
                  className: 'd-none d-md-block ',
                }}
              /> 
            </div>

        
            <div style={{marginTop:60,paddingLeft:60,paddingRight:40}}>
              <Button
              
                style={{marginRight:15,color:'primary',width:100,height:50}} 
                outline 
                color="primary"
                onClick={(event) => this.updatePet(event)}
                >
                    Update
              </Button>
              <Button
                style={{color:'primary', width:100,height:50}} 
                outline 
                color="primary"
               
                onClick={(event) => this.deletePet(event)}
                >
                    Delete
           </Button>
           </div>
           </article>
          </aside>
          <aside className="col-sm-7">
            <article className="p-5">
              <h3 className="title mb-9">{nom}</h3>

              <div className="mb-5">
                <var className="price h2 text-success">
                  <span className="currency">{race}</span>
                </var>
              </div>
              <dl>
                <dt>Description</dt>
                <dd>
                  <p>{description}</p>
                </dd>
              </dl>
              <Row>
                <dt className="col-sm-3">Age</dt>
                <dd className="col-sm-9">{age}</dd>

                <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9"></dd>

                <dt className="col-sm-3">Gender</dt>
                <dd className="col-sm-9">{sexe}</dd>
              </Row>

              <hr />
              <Row>

                <div className="col-sm-5" >
                  <dl className="dlist-inline">
                    <dt>Owner: </dt>
                    <dd className="pl-2">
                      <span className="form-check-label"> {owner.prenom} {owner.nom}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-9">
                  <dl className="dlist-inline">
                    <dt>Job: </dt>
                    <dd>
                      <span className="form-check-label">{owner.job}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-9">
                  <dl className="dlist-inline">
                    <dt>Delivery: </dt>
                    <dd>
                      <span className="form-check-label">{owner.address}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-9">
                  <dl className="dlist-inline">
                    <dt>Contact: </dt>
                    <dd>
                      <span className="form-check-label">+216 {owner.tel} / {owner.email} </span>
                    </dd>
                  </dl>
                </div>
                    
                   
              </Row>
              
            </article>
          </aside>
          </div> 
        

      </Card>

      </Row>   
    </Page>
   
  );
};
}
export default CardPage;
