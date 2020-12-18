import logo200Image from '../assets/img/logo/logo_200.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label,Alert } from 'reactstrap';


class AuthForm extends React.Component {
  
constructor(){
  super()
  this.state={
    lastname:"",
    firstname:"",
    username: "",
    email:"",
    address: "",
    tel: "",
    password:"",
    image:"",
    errors: [],
    checkboxValue: false
    
  }
}
  



  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }


  Login(event){
  
    console.log('test2',this.state.password)
    console.log('test',this.state.email)
    console.log('hello')
    event.preventDefault()
        axios.post('http://localhost:3000/users/login',{
          email:this.state.email,
          password:this.state.password
        })
        .then(res => {
          console.log("response",res.data['status'])
          if(res.data['status']==='error'){
            alert('Invalid Email or Password')
          }
          else{
            localStorage.setItem('idAdmin',this.state.email)
            localStorage.setItem("islogin",true)
            window.location.href='/home'
            

          }
        })
  }

 
  Register(event) {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regTel = /\d{2}\d{3}\d{3}/;
    const { lastname,firstname,email, username,address,tel, password,errors,checkboxValue } = this.state;

    // check with backend API or with some static data
    if (!lastname && lastname.length < 3) {
      errors.push('lastname');
    }
    else if (!firstname && firstname.length < 3) {
    errors.push('firstname');
    }
    else if (!username && username.length < 3) {
      errors.push('username');
      }
    else if (!email && regEmail.test(email) === false) {
        errors.push('email');
      }
    else if (!address && address.length < 3) {
      errors.push('address');
      }
    else if (!tel && regTel.test(tel) === false) {
       errors.push('tel');
      }
    else if (!password&& password.length < 6) {
      errors.push('password');
      }
    else if(checkboxValue === false){
          errors.push('checkbox')
      }
      
      this.setState({ errors });

    if(errors.length) {
      const user = {
          nom:lastname,
          prenom:firstname,
          username:username,
          email:email,
          address:address,
          tel:tel,
          password:password
      }; 
     

    console.log('hello')
    event.preventDefault()
      axios.post("http://localhost:3000/users/add", user)         
      .then(res =>{  
        if(res.data["status"] === "error"){
          console.log("User", res.data["message"]);
      
            window.location.href='/signup'
      }else{
          alert('Your account has been created successfully')
          window.location.href='/'
        }
        console.log("User added", res);
      })
    }
  
  }
  render() {
    const {
      showLogo,
      nameLabel,
      prenameLabel,
      usernameLabel,
      emailLabel,
      telLabel,
      addressLabel,
      nameInputProps,
      prenameInputProps,
      usernameInputProps,
      emailInputProps,
      telInputProps,
      addressInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick
    } = this.props;

    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        
        {this.isSignup && (
          <FormGroup>
          <Label for={nameLabel}>{nameLabel}</Label>
          <Input  onChange={(event) => this.setState({lastname: event.target.value})} {...nameInputProps} />
        </FormGroup>)}

        {this.isSignup && (
        <FormGroup>
          <Label for={prenameLabel}>{prenameLabel}</Label>
          <Input  onChange={(event) => this.setState({firstname: event.target.value})}
           {...prenameInputProps} />
        </FormGroup>)}

        {this.isSignup && (
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input  onChange={(event) => this.setState({username: event.target.value})} 
          {...usernameInputProps} />
        </FormGroup>)}

              <FormGroup>
              <Label for={emailLabel}>{emailLabel}</Label>
              <Input  
              onChange={event => this.setState({email: event.target.value})}
              {...emailInputProps}/>
            </FormGroup>
          {this.isSignup && (
            <FormGroup>
              <Label for={addressLabel}>{addressLabel}</Label>
              <Input  onChange={(event) => this.setState({address: event.target.value})}
              {...addressInputProps} />
            </FormGroup>)}
            {this.isSignup && (
            <FormGroup>
              <Label for={telLabel}>{telLabel}</Label>
              <Input  onChange={(event) => this.setState({tel: event.target.value})} 
              {...telInputProps} />
            </FormGroup>)}

            <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input  onChange={(event) => this.setState({password: event.target.value})}
            {...passwordInputProps} />
            </FormGroup>

            {this.isSignup && (
              <FormGroup>
                <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                <Input {...confirmPasswordInputProps} />
              </FormGroup>
            )}


        <FormGroup check>
          <Label check>
            <Input type="checkbox" value={this.state.checkboxValue} 
            onChange={(event) => this.setState({checkBoxValue: this.state.checkboxValue})} /> {' '}
            {this.isSignup ? 'Accept Terms & Conditions' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />

{/* Button events */}
        {this.isSignup ?  
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={(event)=>  this.Register(event)}>
          {this.renderButtonText()}
        </Button>
         : 
         <Button
         size="lg"
         className="bg-gradient-theme-left border-0"
         block
         onClick={(event)=>  this.Login(event)}>
         {this.renderButtonText()}
       </Button>
       }
        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}

      </Form>
   
       </div>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,

  nameLabel: 'Family Name',
  nameInputProps: {
    type: 'text',
    placeholder: 'Enter your family name',
  },

  prenameLabel: 'First Name',
  prenameInputProps: {
    type: 'text',
    placeholder: 'Enter your first name',
  },

  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'Enter your username',
  },

  emailLabel: 'Email',
  emailInputProps: {
    
    //onChange:event => this.setState({email: event.target.value}),
    type: 'email',
    placeholder: 'Enter your@gmail.com',
  },

  addressLabel: 'Address',
  addressInputProps: {
    type: 'text',
    placeholder: 'Enter your home address',
  },
  
  telLabel: 'Phone number',
  telInputProps: {
    type: 'text',
    placeholder: 'Enter your phone number',
  },

  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'Enter your password',
    
  },

  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'Confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
