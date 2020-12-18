import React, { Component } from 'react';
import {Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView} from 'react-native';
  import { Icon } from 'native-base';

import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            email: "",
            password: "" }
      
      }

        
      
    updateInputVal=(val,prop)=>{

        const state = this.state;
    
        state[prop]=val
    
        this.setState(state)
    
      }
      
                handleSubmit(){
                  console.log("lets login");
            
                  axios.post('http://192.168.1.11:3000/users/login',{
                    email:this.state.email,
                    password:this.state.password
                  })
                  .then(res =>{  
                    console.log(res.data);
                    console.log(res.data["message"])
                    alert(res.data["message"])

                     if (res.data["message"] === "Logged in sucessfully!"){
                      this.props.navigation.navigate('home')

                    }else{
                      this.props.navigation.navigate('login')

                    } 
                    
                }).catch(function(error) {
                  console.log('There has been a problem with your axios operation: ' + error.message);
                    throw error;
                  })
                }

                loginToRegister(){
                  this.props.navigation.navigate('register')
                }

              
    render() {
     
        return (
              <ScrollView>
                {/* HEADER */}
                <View >
              {/* <View style={styles.tempNav}>
                <Text style={{ fontSize: 20,
                              fontWeight: "bold",}}>
                   Adopt Me
                </Text>
              </View> */}

{/*                <View style={styles.navUser}></View> 
 */}       
               <View style={{marginTop:30, marginBottom:10}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign:'center', width: '100%'}}>Welcome back,</Text>
              <Text style={{fontSize: 18, width: '100%', textAlign:'center', color: '#687373'}}>Login to continue </Text>
              </View>

                <Image
                style={styles.image}
                source={{uri:"https://www.northeastohioparent.com/wp-content/uploads/2016/08/Pets-768x370.jpg"}}
                />
              </View>

            

                {/* Form */}

            <View style={styles.container}>
              
              {/*  <View>
                <Text style={styles.header}>Form</Text>
              </View> */}
             
               
                <View style={styles.inputContainer}>
{/*                   <Icon active name='ios-person' style={{color: "#687373"}}  />*/}                  
                    <TextInput
                    autoCorrect={true}
                    style={styles.textInput}
                    placeholder="Email"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'email')}}
                      />
                    <Text style={styles.textError}>{this.state.emailError}</Text>

                </View>
                <View style={styles.inputContainer}>
{/*                  <Icon active name='ios-lock' style={{color: "#687373"}} />
 */}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onBlur={Keyboard.dismiss}
                    value={this.state.password}
                    onChangeText={(val) => {this.updateInputVal(val,'password')}}
                  />
                </View>
                <Text style={styles.textError}>{this.state.passwordError}</Text>
             
                <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                 <Text style={styles.saveButtonText}
                        onPress={(event)=>this.handleSubmit(event)}
                            >Login</Text>
                </TouchableOpacity>
                </View>

               <Text style={styles.registerText}
                    onPress={()=> this.loginToRegister()}
               >
                   No Account?  Sign up here!
               </Text>
                </View>
                </ScrollView>

          );
        }
      }
      
      const styles = StyleSheet.create({
      
        header: {
          fontSize: 25,
          textAlign: 'center',
          margin: 10,
          fontWeight: 'bold'
        },
        inputContainer: {
          
          alignItems: 'center',
          justifyContent: 'center',
          textAlign:'center',
          },
          textInput: {
            borderColor: '#CCCCCC',
            borderWidth:1,
            height: 50,
            width:100 + "%",
            paddingHorizontal:40,
            fontSize: 12,
            marginBottom:10,
          },
          saveButton: {
            backgroundColor: "rgb(247,247,247)",
            padding: 10,
            height:40,
            width:150,
            marginTop:25,
            marginLeft: 100,
            marginRight: 100,
            textAlign: 'center'
          },
          saveButtonText: {
            fontSize: 15,
            textAlign: 'center'
          },
          tempNav: {
            width:100 + "%",
            height:60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(247,247,247)",
            borderBottomColor: "rgb(233,233,233)",
            borderBottomWidth: StyleSheet.hairlineWidth
        },
        container:
        {
            flex: 1,
            width: 100+"%",
            height: 100 + "%"
        },
        image:
        {
            marginBottom:30,
            width: 100 +"%",
            height: 200
        },
        navUser:{
            width: 100+"%",
            height: 50,
            backgroundColor: "rgb(255,255,255)",
        },
        textError:{
          color:"red",
          fontSize:12,
          marginLeft:20,
          marginRight:20,
        },
        registerText:{
          color: "rgb(200,200,200)",       
          fontSize:12,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          textAlign: 'center'
        }
      });
export default Login;