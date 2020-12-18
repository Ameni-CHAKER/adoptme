import React from 'react';
import PropTypes from '../utils/propTypes';

import { Table } from 'reactstrap';

import Avatar from '../components/Avatar';

import withBadge from '../hocs/withBadge';
import {

  Button,

} from 'reactstrap';
const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);



const UserProgressTable = ({ headers, usersData, ...restProps }) => {
  
  return (
    
    
    <Table responsive >
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ avatar,id, name, date, progress }, index) => (
          <tr key={index}>
           
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar} />
            </td>
            <td className="align-middle text-center">{id}</td>
            <td className="align-middle text-center">{name}</td>
            <td className="align-middle text-center">{progress}{/* % */}</td>

{/*             <td className="align-middle text-center">{date}</td>*/}            
                  <td >
                    <Button style={{ marginRight : "4px",paddingLeft : "2rem" ,paddingRight : "2rem"}} 
                    onClick ={()=>this.add()}>
                       <small>Add</small> </Button>
                    <Button style={{ marginRight : "4px",paddingLeft : "2rem" ,paddingRight : "2rem"}}> 
                    <small>Delete</small> </Button>
                    <Button style={{ paddingLeft : "2rem" ,paddingRight : "2rem"}}> 
                    <small>Update</small> </Button>
                    </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      //date: PropTypes.date,
    })
  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;
