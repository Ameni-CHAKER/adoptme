import React, { Component } from 'react';

import {Text,
        StyleSheet,
        View,
        Keyboard,
        TouchableOpacity,
        TextInput,
        Image,
        ScrollView} from 'react-native';

import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            lastName: "",
            fisrtName: "",
            username: "",
            email: "",
            address: "",
            tel: "",
            password: "",
            nameError:"",
            prenameError:"",
            usernameError:"",
            emailError: "",
            addressError:"",
            telError: "",
            passwordError: "" }
      
      }

    updateInputVal=(val,prop)=>{

        const state = this.state;
    
        state[prop]=val
    
        this.setState(state)
        
      }  

  

      validateName = () => {
        if (this.state.lastName.length < 3){
        
             this.setState({
              nameError: 'Last Name must contain at least 3 characters'
            });
            }else{
              this.setState({
                nameError: ''
              });
            }
          }
          validatePrename = () => {
            if (this.state.lastName.length < 3){
            
                 this.setState({
                  prenameError: 'First Name must contain at least 3 characters'
                });
                }else{
                  this.setState({
                    prenameError: ''
                  });
                }
              }
 validateUsername = () => {
                if (this.state.lastName.length < 3){
                
                     this.setState({
                      usernameError: 'Username must contain at least 3 characters'
                    });
                    }else{
                      this.setState({
                        usernameError: ''
                      });
                    }
                  }

       validateEmail = () => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.state.email) === false){
              this.setState({
                emailError: 'Invalid Email, Exp: <your@gmail.com>'
              });
          }else{
            this.setState({
              emailError: ''
            });
        } 
      }
      validateAddress = () => {
        if (this.state.address.length < 3){
        
             this.setState({
              addressError: 'Local Address must contain at least 3 characters'
            });
            }else{
              this.setState({
                addressError: ''
              });
            }
          }
      validateTel = () => {
        const reg = /\d{2}\d{3}\d{3}/;
              if (reg.test(this.state.tel) === false){
                this.setState({
                  telError: 'Invalid Phone Number'
                });
            }else{
              this.setState({
                telError: ''
              });
          } 
        }
      validatePassword = () => {

       /*  const reg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (reg.test(this.state.password) === false){ */
          if (this.state.password.length < 6){
            this.setState({
                passwordError: 'Password must contain at least 6 characters'
         });
          }else{
              this.setState({
                passwordError: ''
              });
            }
          }

    handleSubmit=() =>{     
                if (this.state.name ===""||
                this.state.email ===""||
                this.state.password ===""||
                  this.state.nameError !=="" ||
                 this.state.emailError !==""  ||
                  this.state.passwordError !==""  ){
                  alert('Invalid Credentials!')

                }else{

                   const user = {
                    nom:this.state.lastName,
                      prenom:this.state.fisrtName,
                      username:this.state.username,
                      email:this.state.email,
                      address:this.state.address,
                      tel:this.state.tel,
                      password:this.state.password
                  }; 

                    //const response = await API.delete(`users/${this.state.id}`);

                    axios.post("192.168.1.69:3000/users/add", user)
                  
                      .then(res =>{  
                        alert('Valid Credentials!')
                          console.log("User");
                          console.log("User added", res);
                         
                      })
                    }

                 
                }
            
       registerToLogin(){
           this.props.navigation.navigate('login')
            }      
                


    render() {
    
        return (
            <ScrollView>
                {/* HEADER */}
              <View style={styles.container}>
           {/*    <View style={styles.tempNav}>
                <Text style={{ fontSize: 20,
                              fontWeight: "bold",}}>
                   Adopt Me
                </Text>
              </View> */}
       

              <View style={{marginTop:30, marginBottom:10}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign:'center', width: '100%'}}>Welcome back,</Text>
              <Text style={{fontSize: 18, width: '100%', textAlign:'center', color: '#687373'}}>Register to continue </Text>
              </View>

                <Image
                style={styles.image}
                source={{uri:"https://www.northeastohioparent.com/wp-content/uploads/2016/08/Pets-768x370.jpg"}}
                />
              </View>
            
                {/* Form */}  

            <View style={styles.container}>
              
               {/*<View>
                <Text style={styles.header}>Form</Text>
              </View>
             */}
               
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your last name"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'lastName')
                                            this.validateName(val)}}
                    />
                            <Text style={styles.textError} >{this.state.nameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your fist Name"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'fistName')
                                            this.validatePrename(val)}}
                    />
                            <Text style={styles.textError} >{this.state.prenameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your username"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'username')
                                            this.validateUsername(val)}}
                    />
                            <Text style={styles.textError} >{this.state.usernameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                  
                    style={styles.textInput}
                    placeholder="Please enter your email"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'email')
                    this.validateEmail()}}
                      />
                    <Text style={styles.textError}>{this.state.emailError}</Text>

                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your local address"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'address')
                                            this.validateAddress(val)}}
                    />
                            <Text style={styles.textError} >{this.state.addressError}</Text>

                    
                   
                </View>


                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your phone number"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'tel')
                                            this.validateTel(val)}}
                    />
                            <Text style={styles.textError} >{this.state.telError}</Text>

                    
                   
                </View>


                

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter your password"
                    secureTextEntry={true}
                    onBlur={Keyboard.dismiss}
                    value={this.state.password}
                    onChangeText={(val) => {this.updateInputVal(val,'password')
                    this.validatePassword()}}
                  />
                </View>
                <Text style={styles.textError}>{this.state.passwordError}</Text>
             
                <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                 <Text style={styles.saveButtonText}
                        onPress={(event)=>this.handleSubmit(event)}
                            >Register</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}
                    onPress={()=>this.registerToLogin()}
               >
                   or
                   Login 
               </Text>
                </View>
                </View>
                </ScrollView>
            
          );
        }
      }
      
      const styles = StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          textAlign:'center',
          paddingTop: 45,
                },
        header: {
          fontSize: 25,
          textAlign: 'center',
          margin: 10,
          fontWeight: 'bold'
        },
        inputContainer: {
            paddingTop: 8
          },
          textInput: {
            borderColor: '#CCCCCC',
            borderWidth:1,
            height: 40,
            fontSize: 12,
            paddingLeft: 15,
            paddingRight: 15,
            marginLeft:20,
            marginRight:20,
            marginTop:10
          },
          saveButton: {
            backgroundColor: "rgb(247,247,247)",
            padding: 10,
            height:40,
            width:150,
            marginLeft: 100,
            marginRight: 100,
          },
          saveButtonText: {
            color: '#FFFFFF',
            fontSize: 15,
            color:"#000",
            textAlign: 'center'
          },
          tempNav: {
            width:100 + "%",
            height:60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(230,230,230)",
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
        loginText:{
          color: "rgb(200,200,200)",       
          fontSize:14,
          marginLeft:20,
          marginRight:20,
          marginBottom:50,
          textAlign:'center'
        }
      });
export default Register;