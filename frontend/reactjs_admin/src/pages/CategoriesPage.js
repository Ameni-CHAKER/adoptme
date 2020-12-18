import Page from '../components/Page';

import React from 'react';

import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Table,
} from 'reactstrap';

import axios from 'axios';

//const today = new Date();
/* const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
); */

class CategoriesPage extends React.Component {
  constructor(){
    super()
    this.state={
      Category:[]
    }
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getAllCategory()
  }
  delete(event,id){
    event.preventDefault()
    axios.delete("http://localhost:3000/categories/delete/"+id)
      .then(res =>{  
          console.log("Category deleted", res.data);
          window.location.href='categories'

      })
        
    }
  update(event,id){
    event.preventDefault()
    localStorage.setItem('idCat',id)
    window.location.href='updateCategory'
  }
  
  view(event,id){
    event.preventDefault()
    localStorage.setItem('idCat',id)
    window.location.href='/pet'
  }
 
  getAllCategory(){
    fetch('http://localhost:3000/categories/getAllCategories')
    .then(response => response.json())
    .then(res=>{
      console.log(res)
      this.setState({Category:res.data })
    })
    
  }

  render() {
  
    return (
      <Page
        className="CategoriesPage"
        title="Categories"
        style={{ marginTop: '2rem'}}
        //breadcrumbs={[{ name: 'Categories', active: true }]}
      >
    
            {/* <Col>
            <Card className="mb-3" >
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    '#',
                    'Category Name',
                    'Number',
                    '',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>        
            </Col> */}

            
      <Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th style={{ alignContent :"center",textAlign:"center"}}>#</th>
                    <th style={{ alignContent :"center",textAlign:"center"}}>Category Name</th>
                    <th style={{ alignContent :"center",textAlign:"center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.Category.map((item,index) =>{ 
                    console.log('id',item._id)
                    return (
                      <tr key={index}>
                    <th scope="row" style={{ alignContent :"center",textAlign:"center"}} >
                      1
                    </th>
                    <td style={{ alignContent :"center",textAlign:"center"}} >
                      {item.nomCategory}
                      </td>
                    
                    <td style={{ alignContent :"center",textAlign:"center"}}>
                    {/* <Button style={{ marginRight : "4px",paddingLeft : "2rem" ,paddingRight : "2rem"}}
                    onClick={(event)=>this.add(event)}> <small>Add</small> </Button> */}
                    <Button style={{ marginRight : "20px",paddingLeft : "2rem" ,paddingRight : "2rem"}}  
                    onClick={(event)=>this.view(event,item._id)}> <small>View</small> </Button>
                    <Button style={{ paddingLeft : "2rem" ,paddingRight : "2rem"}}  
                    onClick={(event)=>this.update(event,item._id)}> <small>Update</small> </Button>
                    <Button style={{marginLeft : "20px", paddingLeft : "2rem" ,paddingRight : "2rem"}}  
                    onClick={(event)=>this.delete(event,item._id)}> <small>Delete</small> </Button>
                    </td>
                    
                  </tr>
                    );
                  
                  })
    
                  }
                
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
export default CategoriesPage;
