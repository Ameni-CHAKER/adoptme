import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {ScrollView} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'

class DogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            pets: []
        }
    }
    componentDidMount() {
        this.getDogs()
    }
    getDogs = async () => {
        try {
            console.log("Get Dogs");
            //console.log('IdCat', await AsyncStorage.getItem('@idCat'));
            axios.get('http://192.168.1.69:3000/pets/getPetByCat/' + await AsyncStorage.getItem('@idCat'))
                .then(res => res.data)
                .then(res => {
                    console.log('data', res.data);
                    this.setState({ pets: res.data })
                })

        } catch (error) {

        }
    }
    renderItem=()=>{
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                paddingTop:30,
                alignItems:"center",
                marginLeft: 25,
                marginRight: 20,
            }}>
                {
                        this.state.pets.map((item, i) => {
                            return (
                                <View> 
                            <Text style={{ fontSize: 30 }}> {item.nom} </Text>
                            <Text> {item.description} </Text>
                                </View>
                )
            })}
            </View>

        )
    }

    render() {
        return (


            <SafeAreaView style={{ flex: 1, backgroundColor: '#eddcd2' }}>

                <ScrollView >
                {
                    this.state.pets.map((item, i) => {
                             return (
                              
                                       

                                        <View style={{
                                            marginTop:30,
                                            backgroundColor: 'floralwhite',
                                            borderRadius: 5,
                                            height: 250,
                                            paddingTop:30,
                                            alignItems:"center",
                                            marginLeft: 25,
                                            marginRight: 20,
                                            marginBottom:30
                                        }}>
                                            
                                                            <View key={i}> 
                                                        <Text style={{ fontSize: 30 }}> {item.nom} </Text>
                                                        <Text> {item.description} </Text>
                                                            </View>
                                            
                                    
                                        </View>
                                       
                                       
                             )}
                             )}
                                   
                                  
                                   </ScrollView>                         
               


            </SafeAreaView>




        );
    }
}

export default DogList;