import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './Welcome';
//import Forgot from '../screens/Forgot';
import Explore from './Explore';
import Browse from './Browse';
import Product from './Product';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Add from './Add';
import Profile from './Profile';

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


const screens = createStackNavigator({
  Welcome,
  Explore,
  Browse,
  Product,
  SignUp,
  SignIn,
  Add,
  Profile
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: sizes.base * 3.5,
      backgroundColor: "transparent", // or 'white or colors.white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerTitle:null,
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: sizes.base * 2,
      paddingRight: sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: sizes.base,
    },
  }
});

export default createAppContainer(screens);