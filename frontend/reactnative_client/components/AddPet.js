import React, { Component } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView} from 'react-native';
import axios from 'axios'
import { Picker ,Item} from 'native-base';

class AddPet extends Component {
    

  constructor(props) {
    super(props);
  
    this.state = { 
        nomCategory:'',
        nom: "",
        race: "",
        age: "",
        description: "",
        sexe: "",
        categories: [],
        owner: "",
        image:"",
        }
  
  }
  componentDidMount(){
   
    this.getAllCategoriesNames()
}


  getAllCategoriesNames(){
    console.log("Get categories!");

    axios.get('http://192.168.1.69:3000/categories/getAllCategoriesNames')
    .then(res => res.data)
    .then(res => {
        console.log('data',res.data);
        this.setState({categories:res.data})
    })  
  }

          pickerChange(index){
            this.state.categories.map( (item,i)=>{
            if( index === i ){
              this.setState({
              currentLabel: this.state.categories[index].nomCategory,
              currency: this.state.categories[index].nomCategory
              })
            }
            })
          }
    render() {
      const PickerItem = Picker.Item;
          
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
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign:'center', width: '100%'}}>Welcome </Text>
              <Text style={{fontSize: 18, width: '100%', textAlign:'center', color: '#687373'}}>Add your pet </Text>
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
                    placeholder="Please enter pet name"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'nom')
                                            this.validateName(val)}}
                    />
                            <Text style={styles.textError} >{this.state.nameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter pet race"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'fistName')
                                            this.validatePrename(val)}}
                    />
                            <Text style={styles.textError} >{this.state.prenameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter pet age"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'username')
                                            this.validateUsername(val)}}
                    />
                            <Text style={styles.textError} >{this.state.usernameError}</Text>

                    
                   
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                  
                    style={styles.textInput}
                    placeholder="Please enter pet description"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'email')
                    this.validateEmail()}}
                      />
                    <Text style={styles.textError}>{this.state.emailError}</Text>

                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Please enter pet sexe"
                    onBlur={Keyboard.dismiss}
                    onChangeText={(val) => {this.updateInputVal(val,'address')
                                            this.validateAddress(val)}}
                    />
                            <Text style={styles.textError} >{this.state.addressError}</Text>

                    
                   
                </View>
                  {/* <View  style={{ borderColor: '#CCCCCC',
                                borderWidth:1,
                                marginLeft:20,
                                marginRight:20
                                }} >  */}  

                {/*   <DropDownPicker
                       
                        defaultValue={this.state.nomCategory}
                        containerStyle={{height: 40}}

                        { ...this.state.categories.map((item,index) =>{ 
                          console.log('nomCategory ===========> ',[{label : item.nomCategory,value:item.nomCategory}]);
                          return (   
                               
                          items=
                             [{label:item.nomCategory, value:item.nomCategory}]
                            
                             
                          //<Picker.Item key ={index} > {item.nomCategory}</Picker.Item>
                             
                            )
                            
    
                    })}
                    /> */}
                        
                   
                        <View  style={{ borderColor: '#CCCCCC',
                                borderWidth:1,
                                marginLeft:20,
                                marginRight:20,
                                                  
                                }} > 

                        <Picker
                        
                            selectedValue={this.state.currency}
                            onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>
                              
                              {
                              this.state.categories.map( (item)=>{
                              return <Picker.Item label={item.nomCategory} value={item.nomCategory} />
                              })
                            }

                        </Picker>

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
                            >Add</Text>
                </TouchableOpacity>
             
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

export default AddPet;



/* containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}} */