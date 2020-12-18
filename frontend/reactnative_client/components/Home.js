import React, { Component } from 'react';
import {Text,
    StyleSheet,
    View,
    Image,
    Dimensions} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {ScrollView,TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

//import { AsyncStorage } from "react-native"
//import { AsyncStorage } from "AsyncStorage"

import axios from 'axios'

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            screenWidth:0,
            nomCategory:'',
            categories:[]
        }
    }
    componentDidMount(){
        this.setState({
            screenWidth: Dimensions.get("window").width
        });
        this.getAllCategories()
    }



    _storeData = async (id,nom) => {
        console.log('nom cat =======>',nom);
    
        if(nom ==='Dog'){
            try {
               
                await AsyncStorage.setItem('@idDog',id);
                console.log('idcat',await AsyncStorage.getItem('@idDog'))
              } catch (error) {
                // Error saving data
              }
        
        this.props.navigation.navigate('dogList')

    }else if(nom ==='Cat'){
        try {
            await AsyncStorage.setItem('@idCat',id);
          } catch (error) {
            // Error saving data
          }
          this.props.navigation.navigate('catList')

    }else if(nom ==='Bird'){
        try {
            await AsyncStorage.setItem('@idCat',id);
          } catch (error) {
            // Error saving data
          }
          this.props.navigation.navigate('birdList')

    }else{
        this.props.navigation.navigate('home')

    }

      };

    /* HomeToBirdList(_id){
     
             AsyncStorage.setItem(
              'idCat', '_id'
            );
         
        this.props.navigation.navigate('birdList')
    } */

    getAllCategories(){
        console.log("Get categories!");
  
        axios.get('http://192.168.1.69:3000/categories/getAllCategories')
        .then(res => res.data)
        .then(res => {
            console.log('data',res.data);
            this.setState({categories:res.data})
        })
          
        
      }
    
    render() {
        const imageHeight = Math.floor(this.state.screenWidth * 1.1);
        const imageUri ="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-dog-quotes-1580508958.jpg?crop=1.00xw:0.755xh;0,0.0865xh&resize=640:*";
        
        return (
          
            <ScrollView>
                
            <View style={styles.container}>
            
                <View
                    style={{
                        flexDirection:"row",
                        marginTop:30,
                        alignItems:"center",
                        paddingHorizontal:40
                    }}> 
                        <Icon name="menu" size={30} color ="#a2a2db" style={{width:25}}/>
                        <Icon name="account-circle" size={33} color ="#a2a2db" style={{marginLeft:230}}/>

                </View>

                <View style={{paddingHorizontal:40, marginTop:25}}
                > 
                    <Text style={{fontSize:40,
                                color:'#522289',
                                fontFamily:"RobotoBold"}}>
                                    Welcome
                    </Text>

                    <Text style={{fontSize:20,
                                paddingVertical:10,
                                paddingRight:80,
                                lineHeight:22,
                                color:'#a2a2db',
                                fontFamily:"RobotoRegular"}}>
                                    Sam 
                    </Text>
                </View>

                 <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginRight:-40,marginTop:30}}
                >
                    <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            height:66,
                            width:66, 
                            marginHorizontal: 30,
                            backgroundColor:'#5facdb',
                            borderRadius:50 
                    }}>

                    <Icon name="menu" size={30} color ="white" style={{width:20}}/>


                    </View>

                    <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            height:66,
                            width:66,
                            marginRight:20,
                            backgroundColor:'#5facdb',
                            borderRadius:50 
                    }}>

                    <Icon name="menu" size={30} color ="white" style={{width:20}}/>


                    </View>

                    <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            height:66,
                            width:66,
                            marginRight:20,
                            backgroundColor:'#5facdb',
                            borderRadius:50 
                    }}>

                    <Icon name="menu" size={30} color ="white" style={{width:20}}/>


                    </View>

                    <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            height:66,
                            width:66,
                            marginRight:20,
                            backgroundColor:'#5facdb',
                            borderRadius:50 
                    }}>

                    <Icon name="menu" size={30} color ="white" style={{width:20}}/>


                    </View>

                    <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            height:66,
                            width:66,
                            marginRight:70,
                            backgroundColor:'#5facdb',
                            borderRadius:50 
                    }}>

                    <Icon name="menu" size={30} color ="white" style={{width:20}}/>


                    </View>

                </ScrollView>
 

                <Text style={{

                   fontSize:20,
                    paddingVertical:10,
                    paddingLeft:30,
                    lineHeight:22,
                    color:'#a2a2db',
                    fontFamily:"RobotoRegular",
                    marginTop:50,
                   
                }}>
                    Categories           

                </Text>

                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop:30,marginBottom:30}}
                >
                    {/* cat 1 */}
                    <View style={{
                        backgroundColor:'#eddcd2',
                            height:240,
                            width:190,
                            borderRadius:15,
                            marginHorizontal:30,
                            padding:5
                        }}>
                         
                         <Image source={require('../assets/images/dog.png')}
                                style={{width:180,borderRadius:10,height:180}}/>
                    

                    <View style={{
                            flexDirection:"row",
                            width:150,
                            alignItems:"center",
                            alignContent:"center",
                        }}>

                            <View style={{
                                   alignItems:"center",
                                   alignContent:"center",
                                   paddingHorizontal:5,
                                   paddingVertical:5
                            }}>
                                <Text style={{
                                        fontFamily:"RobotoRegular",
                                        fontSize:15,
                                        alignContent:"center",
                                        color:"#a2a2db"
                                }}>
                                    Dogs
                                </Text>

                            </View>

                    </View>
                    </View>
              
                    {/* cat 2 */}

                    <View style={{
                        backgroundColor:'#eddcd2',
                            height:240,
                            widht:190,
                            borderRadius:15,
                            padding:5
                        }}>
                         
                         <Image source={require('../assets/images/cat.png')}
                                style={{width:180,borderRadius:10,height:180}}/>
                    

                    <View style={{
                            flexDirection:"row",
                            width:150,
                            alignItems:"center"
                        }}>

                            <View style={{
            
                                   paddingHorizontal:5,
                                   paddingVertical:5
                            }}>
                                <Text style={{
                                        fontFamily:"RobotoRegular",
                                        fontSize:15,
                                        color:"#a2a2db"
                                }}>
                                    Cats
                                </Text>

                            </View>

                    </View>
                    </View>
              

                    {/* cat 3 */}

                    
                    <View style={{
                        backgroundColor:'#eddcd2',
                            height:240,
                            width:190,
                            marginHorizontal:30,
                            borderRadius:15,
                            padding:5
                        }}>
                         
                         <Image source={require('../assets/images/bird.png')}
                                style={{width:180,borderRadius:10,height:180}}/>
                    

                    <View style={{
                            flexDirection:"row",
                            width:150,
                            alignItems:"center"
                        }}>

                            <View style={{
            
                                   paddingHorizontal:5,
                                   paddingVertical:5
                            }}>
                                <Text style={{
                                        fontFamily:"RobotoRegular",
                                        fontSize:15,
                                        color:"#a2a2db"
                                }}>
                                    Birds
                                </Text>

                            </View>

                    </View>
                    </View>
              
                </ScrollView>








              {/* <View style={styles.tempNav}>
                <Text style={{ fontSize: 20,fontWeight: "bold"}} >Adopt Me</Text>
              </View> */
             
               /* <View
                style={{width:200,height:80,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize: 20,color:"#858a4c"}}> Welcome </Text>
        </View>  */}
          
               {/* categories */}
               
               { this.state.categories.map((item,index) =>{ 
                  /*   console.log('cat ========> ',item.nomCategory); */
                 // console.log('id',item._id);
                  return (
                <View style={styles.navCategory}  key={index}>
                    
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    
                  
                 
                        <Text 
                        style={{ marginLeft:15,fontSize: 18,color:"#ffff",fontWeight:"bold"}} >
                           {item.nomCategory}
                        </Text>
                    
                    </View>
                    
                     <View  style={{alignItems:"center"}}> 
    
                    <Text style={{fontSize: 30,marginRight:15,marginBottom:15,color:"#ffff" } }
                         onPress={()=> this._storeData(item._id.toString(),item.nomCategory)}
                     >...</Text>

                       
                    </View>
                    </View>
                  )
                })} 
        </View>
        
                </ScrollView>
           /*  
                <Image
                style={{  width: this.state.screenWidth, height:300}}
                
                source={{uri:imageUri}}
                
                /> */

                 /*  Cat category 
                    <View style={styles.navCategory}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text 
                        style={{ marginLeft:15,fontSize: 18,color:"#ffff",fontWeight:"bold"}}>
                            Cat
                        </Text>
                        
                    </View>
                    
                    <View  style={{alignItems:"center"}}> 
                    <Text style={{fontSize: 30,marginRight:15,marginBottom:15,color:"#ffff"}}
                     onPress={()=> this.HomeToCatList(item._id)} >...</Text>
                    </View>
                    </View>
              
            
                <Image
                style={{  width: this.state.screenWidth, height:300}}
                source={{uri:"https://sooant.com/wp-content/uploads/2020/08/2e95079179a09a6897013b8cc7124439.jpeg"}}
            
                />



                   Bird category 
                <View style={styles.navCategory}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{ marginLeft:15,fontSize: 18,color:"#ffff",fontWeight:"bold"}}>Bird</Text>   
                    </View>
                    
                    <View  style={{alignItems:"center"}}> 
                    <Text style={{fontSize: 30,marginRight:15,marginBottom:15,color:"#ffff"}} 
                    onPress={()=> this.HomeToBirdList(item._id)}>...</Text>
                    </View>
                    </View>
              
            
                <Image
                style={{  width: this.state.screenWidth, height:300}}
                source={{uri:"https://images5.alphacoders.com/774/774631.jpg"}}
            
                />
                 </View> */
              /*   /* navigation tab*/
             
              /* <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <NavigationContainer>
                <Tab.Navigator>
                <Tab.Screen name="Register" component={HomeScreen} />
                <Tab.Screen name="Login" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
              </SafeAreaView> */
   
        );
    }
}

const styles = StyleSheet.create({
    
    tempNav: {
        width:100 + "%",
        height:60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(247,247,247)",
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent:"center",
        alignItems:"center"

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
        height: 150
    },
    navCategory:{
        width: 100+"%",
        height: 50,
        
        backgroundColor: "#e4dbd9",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        justifyContent:"space-between"
    },
    userPic:{
        height:40,
        width:40,
        borderRadius:20
    }
});
export default Home;