import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import TournamentsScreen from './TournamentsScreen';
import { useFonts } from '@expo-google-fonts/inter';
import { Dimensions, Image, ScrollView, SafeAreaView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import { TextInput } from 'react-native-web';
import RegisteredTournamentsScreen from './RegisteredTournamentsScreen';


const HomeScreen = ({navigation}) => {
  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={{ height: Dimensions.get("window").height }}>
      <View style={stylesheet.styleHomePage}>
      <View style={stylesheet.styleGrayHeader}>
        </View>
        <TouchableOpacity onPress={ () => navigation.navigate('ProfileScreen')}>
            <Image style={stylesheet.styleUserImage} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/fMOJEF7qf7mmHIFFVZlpQLoz.png" }}/>
        </TouchableOpacity>
        <Image style={stylesheet.styleMainPageHeaderImage} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/YcKxdBFJPrfjR63lzPnTWAiS.png" }}>
        </Image>
        
        <View style={stylesheet.styleTournamentsButton}>
         <Image style={stylesheet.styleImage3} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/AfDJdBGfo0p6B3oqC0Az9WSt.jpeg" }}>
          </Image>
          <Text style={stylesheet.styleViewRAndJoinCurrentTournaments}>
            View and join current tornaments
          </Text>
          <Text 
          style={stylesheet.styleCaption3}
          onPress={ () => navigation.navigate('Tournaments')}>
            Tournaments
          </Text>
        </View>
        <View style={stylesheet.styleRankingsButton}>
          <Image style={stylesheet.styleImage2} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/D5c6RLY5vHeJoLvnzmgsDX84.jpeg" }}>
          </Image>
          <Text style={stylesheet.styleViewRankingsOfPlayersThroughoutSouthAfrica}>
            View rankings of players throughout South Africa
          </Text>
          <Text 
          style={stylesheet.styleCaption2}
          onPress={ () => navigation.navigate('RankingsScreen')}>
            Rankings
          </Text>
        </View>
        <View style={stylesheet.styleMyStatsButton}>
          <Image style={stylesheet.styleImage} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/uO14Lw9Bk9ryGp4Uawu42wBd.jpeg" }}>
          </Image>
          <Text style={stylesheet.stylePersonalStats}>
            View all your personal statistics based games you played
          </Text>

          <Text style={stylesheet.styleCaption}>
            my Stats
          </Text>
        </View>
        <View style={stylesheet.styleNewsUpdatesButton}>
          <Image style={stylesheet.styleImage1} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/mmXc41t26IXgwuh0FbItgSOS.jpeg" }}>
          </Image>
          <Text style={stylesheet.stylePersonaliseAppFunctioanlity}>
            Personlise app functionality
          </Text>
          <Text style={stylesheet.styleCaption1}>
            SATTB News & Updates
          </Text>
        </View>


       
      </View>
    </ScrollView>
  )

  

}

  export default HomeScreen;

  const stylesheet = StyleSheet.create({
    styleImage: {
      position: "absolute",
      left: 0,
      top: 0,
      borderRadius: 14,
      width: 292,
      height: 169,
    },
    styleScroll: {
      width: "100%",
      height: "100%",
      position: "relative",
      
      //bounce: 'false',
      left: 0,
      top: 0,
    },
    stylePersonalStats: {
      position: "absolute",
      left: 13,
      top: 117,
      width: 228,
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "400",
      textAlign: "left",
    },
    styleCaption: {
      position: "absolute",
      left: 13,
      top: 88,
      width: 106,
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "700",
      textAlign: "left",
    },
    styleMyStatsButton: {
      position: "absolute",
      //left: 34,
      alignSelf: "center",
      top: 564,
      width: 292,
      height: 169,
    },
    styleImage1: {
      position: "absolute",
      left: 0,
      top: 0,
      borderRadius: 14,
      width: 292,
      height: 169,
    },
    stylePersonaliseAppFunctioanlity: {
      position: "absolute",
      left: 13,
      top: 117,
      width: 228,
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "400",
      textAlign: "left",
    },
    styleCaption1: {
      position: "absolute",
      left: 13,
      top: 56,
      width: 194,
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "700",
      textDecorationLine: "underline",
      textAlign: "left",
    },
    styleNewsUpdatesButton: {
      position: "absolute",
      //left: 34,
      alignSelf: "center",
      top: 773,
      width: 292,
      height: 169,
    },
    styleImage2: {
      position: "absolute",
      left: 0,
      top: 0,
      borderRadius: 14,
      width: 292,
      height: 169,
    },
    styleViewRankingsOfPlayersThroughoutSouthAfrica: {
      position: "absolute",
      left: 13,
      top: 117,
      width: 228,
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "400",
      textAlign: "left",
    },
    styleCaption2: {
      position: "absolute",
      left: 13,
      top: 88,
      width: 111,
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "700",
      textAlign: "left",
    },
    styleRankingsButton: {
      position: "absolute",
      //left: 34,
      top: 355,
      alignSelf: "center",
      width: 292,
      height: 169,
    },
    styleImage3: {
      position: "absolute",
      left: 0,
      top: 0,
      borderRadius: 14,
      width: 292,
      height: 169,
    },
    styleViewRAndJoinCurrentTournaments: {
      position: "absolute",
      left: 13,
      top: 117,
      width: 239,
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "400",
      textAlign: "left",
    },
    styleCaption3:{
      position: "absolute",
      left: 13,
      top: 88,
      width: 159,
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      //fontFamily: "inter",
      letterSpacing: -0.5,
      fontStyle: "normal",
      fontWeight: "700",
      textAlign: "left",
    },
    styleTournamentsButton:{
      position: "absolute",
      //left: 50,
      //right: 60,
      top: 147,
      width: 292,
      height: 169,
      alignSelf: "center",
    },
    styleGrayHeader: {
      position: "absolute",
      left: 0,
      top: 35,
      width: "100%",
      height: 78,
      backgroundColor: "rgba(235,235,235,1)",
    },
    styleUserImage: {
      position: "absolute",
      left: 310,
      top: 45,
      borderRadius: null,
      width: 41,
      height: 41,
    },
    styleMainPageHeaderImage: {
      position: "absolute",
      //left: 76,
      top: 45,
      bottom: 980,
      alignSelf: "center",
      borderRadius: null,
      width: 184,
      height: 55,
    },
    
    styleHomePage: {
      position: "absolute",
      left: 0,
      top: 0,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255,255,255,1)",
    },
  
    styleStartPage: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 360,
      height: "100%",
    },
})