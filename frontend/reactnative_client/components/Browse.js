import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Card  from './Card';
import Badge from './Badge';
import Button from './Button';
import Block from './Block';
import Text  from './Text';

import axios from 'axios'

const { width } = Dimensions.get('window');
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

class Browse extends Component {
  
  state = {
    active: "Dog",
    category:[],
    pets:[],
  }

  componentDidMount() {
    const {active} = this.state
    this.setState({ category: this.state.category });
    this.getAllCategories()
    this.setState({ pets: this.state.pets });
    this.setState({ active: active})
    this.getPets(this.state.category,active) 
    
  }

   getPets = async (tab) => {
    try {
      await AsyncStorage.setItem('@idCateg',tab._id);
        console.log("Get pets");
        console.log('idcat',await AsyncStorage.getItem('@idCateg'))
        axios.get('http://192.168.1.11:3000/pets/getPetByCat/' + await AsyncStorage.getItem('@idCateg'))
            .then(res => res.data)
            .then(res => {
              console.log('data',res.data);
              this.setState({pets:res.data})
              
               const filtered = tab.filter(
                //pets => pets.categories[_id].includes(tab._id.toLowerCase())
                tabi => tabi._id.includes(pets.categories[_id])
               );

          this.setState({ active: pets.categories[nomCategory], tab: filtered }); 
            })

    } catch (error) {

    }
} 

  getAllCategories(){
    console.log("Get categories!");

    axios.get('http://192.168.1.11:3000/categories/getAllCategories')
    .then(res => res.data)
    .then(res => {
        console.log('data',res.data);
        this.setState({category:res.data})
    })
      
  }
/*   getFile = image => {
    axios.get('http://192.168.1.11:3000/getfile/'+ image.image)
    .then(res => res.data)
    .then(res => {
        console.log('data',res.data);
        //this.setState({image:res.data})
    })
  }  */

   handleTab = tab => {
    /* const { pets } = this.state; */
   /*  const filtered = pets.filter(
      pet => pet.categories.nomCategory.includes(tab.nomCategory.toLowerCase())
    ); */

    this.setState({ active: tab.nomCategory, /* pets: filtered */ });
  } 

 /*  _storeData = async (id,nom) => {
     
            await AsyncStorage.setItem('@idCateg',id);
            console.log('idcat',await AsyncStorage.getItem('@idCateg'))

  } */

  render() {
    const { profile, navigation } = this.props;
    const { category } = this.state;
    const { pets } = this.state;
    //console.log('user --------------------> ',this.props.navigation.state.params.user)
    //const tabs = ['Dog', 'Cat', 'Bird','Other'];

    return (
      <Block>
          <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold style={{marginRight:50}}></Text>
          <Button onPress={() => navigation.navigate('Profile')} style={{backgroundColor: "transparent",marginLeft:100}}>
          <Image
               
              source={profile.avatar}
              style={styles.avatar}
            />
            
          </Button>
          <Button onPress={() => navigation.navigate('Add')} style={{backgroundColor: "transparent"}}>
          <Image
               
              source={profile.add}
              style={styles.add}
            />
            
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>

                    { category.map(tab => { 
                      
                      const { active } = this.state;
                      const isActive = (active === tab.nomCategory); 

                          return (
                            <TouchableOpacity
                              key={tab.nomCategory}
                              onPress={() => {/* this._storeData(tab._id.toString(),tab.nomCategory) */
                                              this.getPets(tab,active)
                                              this.setState({ active: tab.nomCategory})}  }
                              style={[
                                styles.tab,
                                isActive ? styles.active : null
                              ]}
                            >
                              <Text size={18} medium gray={!isActive} secondary={isActive}>
                                {tab.nomCategory}
                              </Text>
                            </TouchableOpacity>
              )})
            }
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: sizes.base * 2}}
        >
          <Block flex={false} row space="between" style={styles.categories}>
           { 
        
          pets.map(item =>{ 
           //console.log('image ==========>',`http://192.168.1.11:3000/getfile/${item.image}`)
                 return (
              <TouchableOpacity
                key={item.nom}
                onPress={() => navigation.navigate('Explore',{item})}
              >
                <Card center middle shadow style={styles.category}>
              
                  <Image style={{height:120, width:120, marginBottom:15,borderRadius: 120/2}} 
                  source={{ uri: `http://192.168.1.11:3000/getfile/${item.image}`}} />
  
                  <Text medium height={20}>{item.nom} </Text>
                  <Text gray caption> more</Text>
                </Card>


              </TouchableOpacity>
              
                 )
            })}
          
          
          </Block>
        </ScrollView>
       
      </Block>
    )
  } 
}

 Browse.defaultProps = {
  profile:{
    username: 'react-ui-kit',
    location: 'Europe',
    email: 'contact@react-ui-kit.com',
    avatar: require('../assets/images/user.png'),
    add: require('../assets/images/add_pet.png'),
    //budget: 1000, //monthly_cap: 5000, //notifications: true, //newsletter: false,
  }
 
}
  
export default Browse;

const styles = StyleSheet.create({
  header: {
    //marginTop: sizes.base,
    paddingHorizontal: sizes.base * 2,
  },
  avatar: {
    height: sizes.base * 1.8,
    width: sizes.base * 1.8,
  },
  add: {
    height: sizes.base * 2.5,
    width: sizes.base * 2.5,
  },
  tabs: {

    borderBottomColor: colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: sizes.base,
    marginHorizontal: sizes.base * 2,
  },
  tab: {
    marginRight: sizes.base * 3.3,
    paddingBottom: sizes.base
  },
  active: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: sizes.base * 2,
    marginBottom: sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (sizes.padding * 2.4) - sizes.base) / 2,
    maxWidth: (width - (sizes.padding * 2.4) - sizes.base) / 2,
    maxHeight: (width - (sizes.padding * 2.4) - sizes.base) ,
  }
})

