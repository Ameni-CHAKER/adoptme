import React from 'react'

import { AppLoading } from "react-native-splash-screen";
import  Block  from "./components/Block";
import { Router, Scene } from 'react-native-router-flux'
import Welcome from './components/Welcome'
import Browse from './components/Browse';
import Explore from './components/Explore';
import Product from './components/Product';
import Navigation from "./components/Navigation";
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-dynamic-vector-icons";
import AnimatedTabBar from '@gorhom/animated-tabbar';

import tabBar from './components/TabBar'
import Profile from './components/Profile';
/*  const tabs = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: (props) => <Icon  {...props} />,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: (props) => <Icon {...props} />,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
}; */

const Tab = createBottomTabNavigator();

export default function App() {

  return (


      <Profile/>

      /*     <NavigationContainer>
   <TabBar/>
   </NavigationContainer> */


    /*   <NavigationContainer>
      <Tab.Navigator
        tabBar={props => (
          <AnimatedTabBar tabs={tabs} {...props} />
        )}
      >
        <Tab.Screen
          name="Home"
          component={Browse}
        />
        <Tab.Screen
          name="Profile"
          component={Explore}
        />
      </Tab.Navigator>
    </NavigationContainer>
         
      
 */
   /*   <Router>

      <Scene key = "root">
      <Scene key = "welcome" component = {Welcome} initial={true} hideNavBar={true}/> 
      <Scene key = "product" component = {Product} hideNavBar={true}/>
      <Scene key = "explore" component = {Explore} hideNavBar={true}/>
      <Scene key = "browse" component = {Browse} hideNavBar={true}/>

      </Scene>
      </Router>
 */
     
  /* <Scene key = "addPet" component = {AddPet}hideNavBar={true}/>
         <Scene key = "home" component = {Home}  hideNavBar={true}/>
         <Scene key = "register" component = {Register} title = "register" hideNavBar={true}/>
         <Scene key = "login" component = {Login} hideNavBar={true}/>
          <Scene key = "dogList" component = {DogList} title = "dogList" />
          <Scene key = "catList" component = {CatList} title = "catList" />
          <Scene key = "birdList" component = {BirdList} title = "birdList" />
        
 */

  );
}
