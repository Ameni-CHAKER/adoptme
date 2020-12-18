import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import Explore from './Explore';
import Browse from './Browse';

const tabs = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: Icon,
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
      component: Icon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const Tab = createBottomTabNavigator();

class BottomNavigation extends Component {
  render() {
  return (
    <NavigationContainer>
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
        );
      }
  }
  
export default BottomNavigation;