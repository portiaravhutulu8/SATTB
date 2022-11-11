import React from 'react';
import {View, Text, StyleSheet, Dimensions, } from 'react-native';

  const SettingsScreen = ({navigation}) => {

    return (
      
        <View style= {stylesheet.Settings}>
          
          <View style={stylesheet.styleGrayHeader}></View>
              <Text h1 bold style= {stylesheet.Setting}>
                Settings
              </Text>
          
              <Text  
              style= {stylesheet.Profile}
              onPress={() => navigation.navigate('Profile')}>

                Profile
              </Text>
    
           {/*   <Text style= {stylesheet.General}>
                General
    </Text>*/}
              
              <Text style= {stylesheet.Logout}
              onPress={() => navigation.navigate('LoginScreen')}>
                Logout
            </Text>
          </View>
      
      
      );
    }
  
  export default SettingsScreen;

    const stylesheet = StyleSheet.create({
      Settings:{
        position: "relative",
        width: Dimensions.get("window").width,
        height: 800,
        borderRadius: 0,
        transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
        backgroundColor: "rgba(255,255,255,1)",
        left:0,
        top:0,
      },
      
      
      Profile: {
        position: "absolute",
        width: 306,
        height: 50,
        left: 25,
        right: "auto",
        top: 166,
        bottom: "auto",
        transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 20,
        color: "rgba(0,0,0,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      
      
      Setting: {
        position: "absolute",
        width: 234,
        height: 45,
        //left: 56,
        alignSelf: "center",
        right: "auto",
        top: 67,
        bottom: "auto",
        transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 32,
        color: "rgba(0,0,0,1)",
        textAlign: "center",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Logout: {
        position: "absolute",
        width: 306,
        height: 50,
        left: 25,
        right: "auto",
        top: 241,
        bottom: "auto",
        transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 20,
        color: "rgba(0,0,0,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      General: {
        position: "absolute",
        width: 306,
        height: 50,
        left: 25,
        right: "auto",
        top: 241,
        bottom: "auto",
        transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 20,
        color: "rgba(0,0,0,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      styleGrayHeader: {
        position: "absolute",
        left: 0,
        top: 35,
        width: "100%",
        height: 100,
        backgroundColor: "rgba(235,235,235,1)",
      },
    })