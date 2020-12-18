import React, { Component } from 'react'
import { Alert,ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

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

  
export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    emailError:"",
    passwordError:"",
    errors: [],
    loading: false,
  }

  handleLogin() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (regEmail.test(email) === false) {
        errors.push('email');
      this.setState({
         emailError: 'Invalid Email, Exp: <your@gmail.com>'
      });
      }
      if (password.length < 6) {
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
            console.log("lets login");
            
            axios.post('http://192.168.1.11:3000/users/login',{
              email:email,
              password:password
            })
            .then(res =>{  
              console.log(res.data);
              console.log(res.data["message"])

              if(res.data["message"] === "Logged in sucessfully!"){
                Alert.alert(
                    'Success!',
                    'Account Found',
                    [
                      {
                        text: 'Continue', onPress: () => {
                          navigation.navigate('Browse', {user: res.data["user"]})
                        }
                      }
                    ],
                    { cancelable: false }
                  )

              }else{
                Alert.alert(
                    'Fail!',
                     'Invalid Credentials',
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
              
          }).catch(function(error) {
            console.log('There has been a problem with your axios operation: ' + error.message);
              throw error;
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
    <ScrollView > 
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0,  sizes.base * 2]}>
          <Text h1 bold>Login</Text>
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
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={(val) => {this.onChange(val,'password')}}
              />
              <Text  style={styles.textError}  >{this.state.passwordError}</Text>

            <Button gradient onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Login</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Browse')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor:  colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor:  colors.accent,
  },
  textError:{
    color:"red",
    fontSize:12
  },
})
