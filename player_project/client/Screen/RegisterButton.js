import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import { Dimensions, Image, ScrollView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; 


const RegisterButton = () => {
  const navigation = useNavigation();

    return (
        <View style = {stylesheet.Tournaments}>
            
          <View style = {stylesheet.TournamentsCont}>
          
          </View>
          
          <Image 
          
          source={require('/Users/thilivhaliportiaravhutulu/SATTB/player_project/SATableTennisApp/player_project/client/Image/TournamentHeader.png')}
          style= {stylesheet.styleTournamentHeader}>
            
        </Image>
        
        <AntDesign 
            name="arrowleft" 
            size={45}
            style={{
              position: 'absolute',
              top: 40,
              left: 15
            }}
            color="rgba(0,0,0,1)"
            onPress={ () => navigation.goBack(null)}
            />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text>No Tournament Games Available.</Text>
        </View>
        </View>
    )
}

export default RegisterButton;

const stylesheet = StyleSheet.create({
    Tournaments:{
      position: "relative",
      width: Dimensions.get("window").width,
      height: 800,
      borderRadius: 0,
      overflow: "hidden",
      transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
      backgroundColor: "rgba(255,255,255,1)",
      left: 0,
      top: 0,
    },
    TournamentsCont: {
      position: "absolute",
      width: "100%",
      height: 225,
      borderRadius: 1000,
      right: 0,
      bottom: "auto",
      transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
      backgroundColor: "rgba(235,235,235,1)",
      left: 0,
      top: -103,
    },
    styleTournamentHeader: {
      position: "absolute",
      //left: 76,
      top: 40,
      bottom: "auto",
      alignSelf: "center",
      resizeMode: "contain",
      borderRadius: null,
      width: 250,
      height: 120,
    },
})
