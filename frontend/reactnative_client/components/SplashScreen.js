import React, { Component } from 'react';
//import AnimatedSplash from "react-native-animated-splash-screen";
import Animated from 'react-native-reanimated';
import {Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
  import Logo from '../assets/logo.png'
//import { AppNavigator } from 'react-navigation';

/* const AppNavigator = createStackNavigator(
  {
    home: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    dashboard: {
      screen: Login,
      navigationOptions: {
        title: "Login",
      },
    },
    dashboard: {
      screen: Home,
      navigationOptions: {
        title: "Home",
      },
    },
  },
  {
    initialRouteName: "Login",
  }
)

const Container = createAppContainer(AppNavigator)
 */
class SplashScreen extends Component {
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner:true
      }
    
      componentDidMount(){
        const{LogoAnime,LogoText} = this.state;
        Animated.parallel([
          Animated.spring(LogoAnime,{

            toValue:1,
            tension: 10,
            friction: 2,
            duration:1000,
          }).start(),

          Animated.timing(LogoText,{
            toValue:1,
            duration: 1200,
          }),
        
        ]).start(() => {
          this.setState({
            loadingSpinner:true
          })
        })

      }
   
      render() {
        return (
            <View style={styles.container}>
              <Animated.View
              style={{
                opacity:this.state.LogoAnime,
                top:this.state.LogoAnime.interpolate({
                  inputRange:[0,1],
                  outputRange:[80,0]
                })              
                }}>
              <Image 
/*               style={{height:'100',width:'100'}}
 */              source={Logo} />
              </Animated.View>
              
                  <Animated.View  
                  style={{opacity:this.state.LogoText}}>

                <Text style={styles.logoText}> LogoText </Text>
                 </Animated.View>
               
               </View>
                           

        )
      }
    }

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#5257F2',
    justifyContent: 'center',
    alignItems: 'center'
          },
  logoText: {
    color: '#FFFF',
    fontSize:30,
    marginTop:29.1,
    fontWeight:'300'
  },
});