import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet,View,Image,TouchableOpacity } from 'react-native';
import { Picker } from 'native-base';
import  Button  from './Button';
import  Block  from './Block';
import  Text  from './Text';
import  Input  from './Input';
import  {ScrollView}  from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

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


export default class Add extends Component {
 
  state = {
    nom:"hoho",
    race:"berger",
    age: "5 mois",
    description: "adopt me!",
    sexe: "male",
    categories:[],
    owner: "",
    errors: [],
    loading: false,
    nomError:"",
    raceError: "",
    ageError:"",
    descriptionError: "",
    sexeError:"",
    categoriesError:"",
    idCat:null,
    filePath:"",
    fileData:"",
    filename:"",
    fileUri:"",
    fileType:"",
    fileSize:""

  }

  componentDidMount(){
    this.getAllCategoriesNames()
  }

  handleAdd() {
    const { navigation } = this.props;
    const {nom,race,age,description,sexe,idCat,filePath,fileData,filename,fileUri,fileType,fileSize} = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!nom ) {
      errors.push('nom');
      this.setState({
        nomError: 'Last Name must contain at least 3 characters'
      });
    }
    if (!race ) {
    errors.push('race');
    this.setState({
       raceError: 'First Name must contain at least 3 characters'
    });
    }
    if (!age ) {
      errors.push('age');
      this.setState({
         ageError: 'Username must contain at least 3 characters'
      });
      }
    if (!description) {
        errors.push('description');
      this.setState({
         descriptionError: 'Invalid Email, Exp: <your@gmail.com>'
      });
      }
    if (!sexe ) {
      errors.push('sexe');
      this.setState({
         sexeError: 'Local Address must contain at least 3 characters'
      });
      }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      console.log("idCat ================>",idCat)
      const data = new FormData()   /// data.append('file', this.state.file)    
      const config = { header : { "content-type": "multipart/form-data", "accept": "application/json" } }

      data.append("nom", nom)
      data.append("race", race)
      data.append("age", age)
      data.append("description", description)
      data.append("sexe", sexe)
      data.append("categories",idCat)
      data.append("image", { type: fileType, size: fileSize, uri: `file://${filePath}`, name: filename })
  

/* 
      const pet = {
          nom:nom,
          race:race,
          age:age,
          description:description,
          sexe:sexe,
          categories:idCat,
          image:filePath

      };  */

      axios.post("http://192.168.1.11:3000/pets/addPetWithImage",data,config)
                  
      .then(res =>{  
        if(res.data["message"]=== "error"){
        Alert.alert(
          'Fail!',
           'Invalid Credentials',
          [
            {
              text: 'Return', onPress: () => {
                navigation.navigate('Add')
              }
            }
          ],
          { cancelable: false }
        )
        }else{
          Alert.alert(
            'Success!',
            'Your pet has been added with success',
            [
              {
                text: 'Continue', onPress: () => {
                  navigation.navigate('Browse')
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

  getAllCategoriesNames(){
    console.log("Get categories!");

    axios.get('http://192.168.1.11:3000/categories/getAllCategoriesNames')
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
      //currentLabel: this.state.categories[index].nomCategory,
      catValue: this.state.categories[index].nomCategory,
      idCat:this.state.categories[index]._id
      })
    }
    })
  }

    //image picker 
    chooseImage = () => { 
    let options = {
      title: 'Select Image',
     /*  customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ], */
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    /*   } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton); */
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
         filePath: response.path,
         fileData: response.data,
         fileUri: response.uri,
         filename:response.fileName,
         fileType:response.type,
         fileSize:response.size
        });
      }
    });
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
              label="Name"
              error={hasErrors('nom')}
              style={[styles.input, hasErrors('nom')]}
              defaultValue={this.state.nom}
              onChangeText={(val) => {this.onChange(val,'nom')}}
            />
            <Text style={styles.textError} >{this.state.nomError}</Text>

             <Input
              label="Race"
              error={hasErrors('race')}
              style={[styles.input, hasErrors('race')]}
              defaultValue={this.state.race}
              onChangeText={(val) => {this.onChange(val,'race')}}
              />
              <Text  style={styles.textError}  >{this.state.raceError}</Text>

            <Input
              label="Age"
              error={hasErrors('age')}
              style={[styles.input, hasErrors('age')]}
              defaultValue={this.state.age}
              onChangeText={(val) => {this.onChange(val,'age')}}
              />
              <Text  style={styles.textError}  >{this.state.ageError}</Text>
            <Input
              
              label="Description"
              error={hasErrors('description')}
              style={[styles.input, hasErrors('description')]}
              defaultValue={this.state.description}
              onChangeText={(val) => {this.onChange(val,'description')}}
              />
              <Text  style={styles.textError}  >{this.state.descriptionError}</Text>

             <Input
              label="Sexe"
              error={hasErrors('sexe')}
              style={[styles.input, hasErrors('sexe')]}
              defaultValue={this.state.sexe}
              onChangeText={(val) => {this.onChange(val,'sexe')}}
              />
              <Text  style={styles.textError}  >{this.state.sexeError}</Text>
            
              <Text  style={{color:colors.gray2}}> Category </Text>
             
              <View  
              style={styles.picker} > 

                        <Picker
                            selectedValue={this.state.catValue}
                            
                            onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>
                              
                              {
                              this.state.categories.map( (item)=>{
                       
                              return <Picker.Item label={item.nomCategory} value={item.nomCategory} />
                              })
                            }

                        </Picker>

              </View> 
                    


              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
              <Text gray caption style={{ textDecorationLine: 'underline',marginTop:20,fontSize:14}}>
                Choose photo 
              </Text>
              </TouchableOpacity>
              <Text gray  style={{ marginBottom:50,marginTop:5,fontSize:14}}>
                {this.state.filename}
              </Text>

            <Button gradient onPress={() => this.handleAdd()} >
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Add</Text>
              }
            </Button>

            <Button style={{marginBottom:sizes.base * 2}} 
            onPress={() => navigation.navigate('SignIn')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Cancel
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
  picker:{
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom:sizes.base
  }
})
