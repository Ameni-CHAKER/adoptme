import React,{Component} from 'react';

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Browse from './Browse';
import Explore from './Explore';
import Product from './Product';

import Icon from 'react-native-vector-icons/Feather';
import SignIn from './SignIn';

const Tabs = AnimatedTabBarNavigator();

class TabBar extends Component {
    render() {
    return (
  <Tabs.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222"
        //tabBarBackground:"grey"
    }}
  >

    <Tabs.Screen name="Browse" component={Browse}
     options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="Home"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
       />
    <Tabs.Screen name="Explore" component={Explore} />
    <Tabs.Screen name="Product" component={Product} />
    <Tabs.Screen name="SignIn" component={SignIn} />
  </Tabs.Navigator>
    )
 }
}

export default TabBar;