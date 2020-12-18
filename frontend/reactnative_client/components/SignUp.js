import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import  Button  from './Button';
import  Block  from './Block';
import  Text  from './Text';
import  Input  from './Input';
import  {ScrollView}  from 'react-native-gesture-handler';

import axios from 'axios';

const colors = {
  accent: "#F3534A",
  primary: "#0AC4BA",
  secondary: "#2BDA8E",
  tertiary: "#FFE358",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  gray2: "#C5CCD6",
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
};


export default class SignUp extends Component {
 
  state = {
    lastname:"",
    firstname:"",
    username: "",
    email: "",
    address: "",
    tel: "",
    password: "",
    errors: [],
    loading: false,
    nameError:"",
    prenameError: "",
    usernameError:"",
    emailError: "",
    addressError:"",
    telError:"",
    passwordError: ""
  }

  handleSignUp() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regTel = /\d{2}\d{3}\d{3}/;
    const { navigation } = this.props;
    const { lastname,firstname,email, username,address,tel, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!lastname && lastname.length < 3) {
      errors.push('lastname');
      this.setState({
        nameError: 'Last Name must contain at least 3 characters'
      });
    }
    if (!firstname && firstname.length < 3) {
    errors.push('firstname');
    this.setState({
       prenameError: 'First Name must contain at least 3 characters'
    });
    }
    if (!username && username.length < 3) {
      errors.push('username');
      this.setState({
         usernameError: 'Username must contain at least 3 characters'
      });
      }
    if (!email && regEmail.test(email) === false) {
        errors.push('email');
      this.setState({
         emailError: 'Invalid Email, Exp: <your@gmail.com>'
      });
      }
    if (!address && address.length < 3) {
      errors.push('address');
      this.setState({
         addressError: 'Local Address must contain at least 3 characters'
      });
      }
    if (!tel && regTel.test(tel) === false) {
      errors.push('tel');
      this.setState({
         telError: 'Invalid Phone Number'
      });
      }
      /*  const reg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (reg.test(this.state.password) === false){ */
    if (!password&& password.length < 6) {
      errors.push('password');
      this.setState({
         passwordError: 'Password must contain at least 6 characters'
      });
      }else{
        this.setState({
          passwordError: ''
       });
      }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      const user = {
          nom:lastname,
          prenom:firstname,
          username:username,
          email:email,
          address:address,
          tel:tel,
          password:password
      }; 

      axios.post("http://192.168.1.11:3000/users/add", user)
                  
      .then(res =>{  
        if(res.data["message"] === "error"){
        Alert.alert(
          'Fail!',
           'Invalid Credentials or you already have an account',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('SignUp')
              }
            }
          ],
          { cancelable: false }
        )
        }else{
          Alert.alert(
            'Success!',
            'Your account has been created',
            [
              {
                text: 'Continue', onPress: () => {
                  navigation.navigate('SignIn')
                }
              }
            ],
            { cancelable: false }
          )

        }
        
        console.log("User added", res);
         
      })

      
    }
  }

  onChange=(val,prop)=>{

    const state = this.state;

    state[prop]=val

    this.setState(state)
    
  }  

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <ScrollView>
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, sizes.base * 2]} >
        <Text h1 bold>Sign Up</Text>
        <Block middle>
        <Input
              label="LastName"
              error={hasErrors('lastname')}
              style={[styles.input, hasErrors('lastname')]}
              defaultValue={this.state.lastName}
              onChangeText={(val) => {this.onChange(val,'lastname')}}
            />
            <Text style={styles.textError} >{this.state.nameError}</Text>

             <Input
              label="FirstName"
              error={hasErrors('firstname')}
              style={[styles.input, hasErrors('firstname')]}
              defaultValue={this.state.fisrtName}
              onChangeText={(val) => {this.onChange(val,'firstname')}}
              />
              <Text  style={styles.textError}  >{this.state.prenameError}</Text>

            <Input
              label="Username"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={(val) => {this.onChange(val,'username')}}
              />
              <Text  style={styles.textError}  >{this.state.usernameError}</Text>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={(val) => {this.onChange(val,'email')}}
              />
              <Text  style={styles.textError}  >{this.state.emailError}</Text>
             <Input
              label="Address"
              error={hasErrors('address')}
              style={[styles.input, hasErrors('address')]}
              defaultValue={this.state.address}
              onChangeText={(val) => {this.onChange(val,'address')}}
              />
              <Text  style={styles.textError}  >{this.state.addressError}</Text>
             <Input
              label="Phone Number"
              error={hasErrors('tel')}
              style={[styles.input, hasErrors('tel')]}
              defaultValue={this.state.tel}
              onChangeText={(val) => {this.onChange(val,'tel')}}
              />
              <Text  style={styles.textError}  >{this.state.telError}</Text>
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={(val) => {this.onChange(val,'password')}}
              />
              <Text  style={styles.textError}  >{this.state.passwordError}</Text>



            <Button gradient onPress={() => this.handleSignUp()} >
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button style={{marginBottom:sizes.base * 2}} 
            onPress={() => navigation.navigate('SignIn')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
            </Block>

          </Block>
         
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: colors.accent,
  },
  textError:{
    color:"red",
    fontSize:12
  },
})
