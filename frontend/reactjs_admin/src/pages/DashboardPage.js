import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';

import axios from 'axios';

class DashbordPage extends React.Component {
  constructor(){
    super()
    this.state={
      user:[],
      image:''
    }
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getAllUsers()
  }

  delete(event,id){
    event.preventDefault()
    axios.delete("http://localhost:3000/users/deleteUserById/"+id)
      .then(res =>{  
          console.log("User deleted", res.data);
          window.location.href='/'

      })
        
    } 
   update(event,id){
    event.preventDefault()
    localStorage.setItem('idUser',id)
    window.location.href='/updateUser'
  }
 
   getAllUsers(){
     //const {image,user}=this.state;
    fetch('http://localhost:3000/users/getall')
    .then(response => response.json())
    .then(res=>{
       this.setState({user:res.data}) 
    })
    
  } 

  render() {
    let rank=0;
    return (
      <Page
        className="UsersPage"
        title="Users"
        style={{ marginTop: '2rem'}}

      >
            
      <Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th style={{ alignContent :"center",textAlign:"center"}}>#</th>
                    <th style={{ alignContent :"center",textAlign:"center"}}>Avatar</th>
                    <th style={{ alignContent :"center",textAlign:"center"}}>Username</th>
                    <th style={{ alignContent :"center",textAlign:"center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.user.map((item,index) =>{ 
                    return (
                      <tr key={index}>
                    <th scope="row" style={{ alignContent :"center",textAlign:"center"}} >
                       { rank=rank+1}
                    </th>
               
                    <td style={{ alignContent :"center",textAlign:"center"}} >
                     
                    { item.image === undefined  ?
                     <img className="rounded-circle can-click"
                     style={{width:'50px',height:'50px'}} 
                      src={require('../assets/img/users/profile.png')} />
                     : 
                     <img className="rounded-circle can-click"
                      style={{width:'50px',height:'50px'}} 
                      src={`http://localhost:3000/getfile/${item.image}`} 
                      />
                      
                    }
                      
                      </td>
                    <td style={{ alignContent :"center",textAlign:"center"}} >
                      {item.username}
                      </td>
                    
                    <td style={{ alignContent :"center",textAlign:"center"}}>
                    {/* <Button style={{ marginRight : "4px",paddingLeft : "2rem" ,paddingRight : "2rem"}}
                    onClick={(event)=>this.add(event)}> <small>Add</small> </Button> */}
                     <Button style={{ marginRight : "20px",paddingLeft : "2rem" ,paddingRight : "2rem"}}  
                    onClick={(event)=>this.delete(event,item._id)}> <small>Delete</small> </Button>
                    <Button style={{ paddingLeft : "2rem" ,paddingRight : "2rem"}}  
                    onClick={(event)=>this.update(event,item._id)}> <small>Update</small> </Button> 
                    </td>
                    
                  </tr>
                    );
                  
                  })}
                
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      </Page>
    );
  }
}
export default DashbordPage;
