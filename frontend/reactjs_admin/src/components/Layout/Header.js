import Avatar from '../Avatar';
import { UserCard } from '../Card';
import Notifications from '../Notifications';
import SearchInput from '../SearchInput';
import { notificationsData } from '../../demos/header';
import withBadge from '../../hocs/withBadge';
import React from 'react';
import userImage from '../../assets/img/users/profile.png';

import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from '../../utils/bemnames';

const bem = bn.create('header');

/* const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);
 */
class Header extends React.Component {
  constructor(){
    super()
    this.state={
          name:'',
          prename:'',
          username:'',
          email:'',
          address:'',
          tel:'',
          password:'',
          image:'profile.png'
    }
  }
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    islogin:false
  };

  componentDidMount() {
    if(localStorage.getItem('idAdmin'))
   {
    this.getAdminInfos()
   }
  }

  goToLogin(event){
    event.preventDefault()
    window.location.href='/login'
  }

  Logout(event){
      localStorage.clear();
      window.location.href='/'
      this.setState({
        islogin:false
      });
      if (this.state.isOpenUserCardPopover) {
        this.setState({
          isOpenUserCardPopover: false,
        });
      }
}


  getAdminInfos(){ 
    fetch('http://localhost:3000/users/getUserByMail/'+localStorage.getItem('idAdmin'))
    .then(response => response.json())
    .then(res=>{
      console.log('res',res.data)
      this.setState({name:res.data.nom,
                    prename:res.data.prenom,
                    username:res.data.username,
                    email:res.data.email,
                    address:res.data.address,
                    tel:res.data.tel,
                    password:res.data.password,
                    image:res.data.image || 'profile.png',
                    islogin: true
                    //idAmin:res.data._id
                    })
    })
}

  toggleNotificationPopover = () => {
    
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
  
    });

  
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const {name,prename,email,image,islogin} = this.state
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
         {/*  <SearchInput /> */}
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          
      {/* avatar profile */}
          <NavItem>
            <NavLink id="Popover2">

              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
                src= { `http://localhost:3000/getfile/${image}`}

              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                { islogin ?
                  <UserCard
                    avatar={ `http://localhost:3000/getfile/${image}`}
                    title={`${name} ${prename}`}
                    subtitle={email}
                    //text="Last update 3 mins ago"
                    className="border-light">
                         <ListGroup flush>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdSettingsApplications /> Settings
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light" onClick={(event) => this.Logout(event)}>
                          <MdExitToApp /> 
                          Signout
                        </ListGroupItem>
                      </ListGroup>
                    </UserCard>
                    : 
                    <UserCard
                    avatar={userImage}
                    title={`${name} ${prename}`}
                    subtitle={email}
                    //text="Last update 3 mins ago"
                    className="border-light">
                         <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Settings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light" onClick={(event) => this.goToLogin(event)}>
                      <MdExitToApp /> 
                      Login
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>

                  }

               
              </PopoverBody>
            </Popover>
          
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
