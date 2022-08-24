import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import {View, Text, StyleSheet, Button, SafeAreaView, Dimensions, Alert} from 'react-native';
import SettingsScreen from './DrawerScreens/SettingsScreen';

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
      
        <View style= {stylesheet.Profilepage}>
          
         
            
          <View style={stylesheet.styleGrayHeader}>
            <AntDesign 
            name="arrowleft" 
            size={45}
            color="rgba(0,0,0,1)"
            onPress={ () => navigation.goBack('SettingsScreen')}
            />
          </View>
              <Text h1 bold style= {stylesheet.Profile}>
                Profile
              </Text>
          
            
              <Text  style= {stylesheet.FirstName}>
                First Name: 
              </Text>
            
           
              <Text style= {stylesheet.LastName}>
                Last Name
              </Text>
              
            
              <Text style= {stylesheet.EmailAddress}>
                Email Address: 
            </Text>
   
          </View>
      
      
      );
    }
  
  export default ProfileScreen;

  const stylesheet = StyleSheet.create({
    Profilepage:{
      position: "relative",
      width: Dimensions.get("window").width,
      height: 800,
      borderRadius: 0,
      transform: [{translateX:0}, {translateY:0}, {rotate: "0deg"},],
      backgroundColor: "rgba(255,255,255,1)",
      left:0,
      top:0,
    },
    
    
    FirstName: {
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
    
    
    Profile: {
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
    EmailAddress: {
      position: "absolute",
      width: 306,
      height: 50,
      left: 25,
      right: "auto",
      top: 316,
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
    LastName: {
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