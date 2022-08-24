import React from 'react';
import { Dimensions, Image, ScrollView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; 
import {Svg, Path } from 'react-native-svg';

const TournamentsScreen = () => {
    return (
        <View style = {stylesheet.Tournaments}>
          <View style = {stylesheet.TournamentsCont}>
          </View>
          <Image 
          source={require('/Users/thilivhaliportiaravhutulu/SATTB/player_project/SATableTennisApp/player_project/frontend/Image/TournamentHeader.png')}
          style= {stylesheet.styleTournamentHeader}>
        </Image>
          <View style = {stylesheet.Group1}>
            <View style = {stylesheet.Button1} >
            </View>
            
              <Text style = {stylesheet.Join}>
                Join available tournaments
              </Text>
            
            
              <Text style = {stylesheet.Register}>
                Register
              </Text>
           
          </View>
          <View style = {stylesheet.Group2}>
            <View style = {stylesheet.Button2}>
            </View>
           
              <Text style = {stylesheet.View}>
                View all Registered tournaments
              </Text>
           
            
              <Text style = {stylesheet.Registered}>
                Registered
              </Text>
            
          </View>
          <View style = {stylesheet.Group3}>
            <View style = {stylesheet.Button3}>
            </View>
           
              <Text style = {stylesheet.ViewAllAgeGroups}>
                All age groups tournaments
              </Text>
            
            
              <Text style = {stylesheet.ViewAll}>
                View All
              </Text>
            
          </View>
          <View style = {stylesheet.Group4}>
            <View style = {stylesheet.Button4}>
            </View>
            
              <Text style = {stylesheet.Attend}>
                Attend available tournaments
              </Text>
            
           
              <Text style = {stylesheet.Watch}>
                Watch
              </Text>
           
          </View>
        </View>
      );
    };

    export default TournamentsScreen;

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
        top: -63,
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
      Group1: {
        position: "absolute",
        width: 292,
        height: 84,
        overflow: "hidden",
        left: 22,
        //alignSelf: "center",
        borderRadius: 14,
        transform: [{translateX: 34}, {translateY:194}, {rotate: "0deg"},],
        backgroundColor: "rgba(0,0,0,1)",
      },
      Button1: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        opacity: 1,
        transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
        backgroundColor: "rgba(179,179,179,1)",
        left: 0,
        right: "auto",
      },
      Join: {
        position: "absolute",
        width: 195,
        height: 18,
        transform: [{translateX: 0}, {translateY:45}, {rotate: "0deg"},],
        left: 70,
        //alignSelf: "center",
        right: "auto",
        //fontFamily: "Inter",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 14,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Register: {
        position: "absolute",
        width: "auto",
        height: "auto",
        transform: [{translateX: 0}, {translateY:16}, {rotate: "0deg"},],
        left: 70,
        right: "auto",
        //alignSelf: "center",
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 24,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Group2: {
        position: "absolute",
        width: 292,
        height: 84,
        overflow: "hidden",
        borderRadius: 14,
        left: 22,
        transform: [{translateX: 34}, {translateY:430}, {rotate: "0deg"},],
        backgroundColor: "rgba(0,0,0,1)",
      },
      Button2: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        opacity: 1,
        transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
        backgroundColor: "rgba(179,179,179,1)",
        left: 0,
        right: "auto",
      },
      View: {
        position: "absolute",
        width: 210,
        height: 18,
        transform: [{translateX: 0}, {translateY:45}, {rotate: "0deg"},],
        left: 70,
        //alignSelf: "center",
        right: "auto",
        //fontFamily: "Inter",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 14,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Registered: {
        position: "absolute",
        width: "auto",
        height: "auto",
        transform: [{translateX: 0}, {translateY:16}, {rotate: "0deg"},],
        left: 70,
       //alignSelf: "center",
        right: "auto",
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 24,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Group4: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        left: 22,
        overflow: "hidden",
        transform: [{translateX: 34}, {translateY:548}, {rotate: "0deg"},],
        backgroundColor: "rgba(0,0,0,1)",
      },
      Button4: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        alignSelf: "center",
        opacity: 1,
        transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
        backgroundColor: "rgba(179,179,179,1)",
        left: 0,
        right: "auto",
      },
      Attend: {
        position: "absolute",
        width: 195,
        height: 18,
        transform: [{translateX: 0}, {translateY:45}, {rotate: "0deg"},],
        left: 70,
        right: "auto",
        //alignSelf: "center",
        //fontFamily: "Inter",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 14,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Watch: {
        position: "absolute",
        width: "auto",
        height: "auto",
        transform: [{translateX: 0}, {translateY:16}, {rotate: "0deg"},],
        left: 70,
        right: "auto",
        //fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        //alignSelf: "center",
        fontSize: 24,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      Group3: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        left: 22,
        overflow: "hidden",
        transform: [{translateX: 34}, {translateY:312}, {rotate: "0deg"},],
        backgroundColor: "rgba(0,0,0,1)",
      },
      Button3: {
        position: "absolute",
        width: 292,
        height: 84,
        borderRadius: 14,
        opacity: 1,
        transform: [{translateX: 0}, {translateY:0}, {rotate: "0deg"},],
        backgroundColor: "rgba(179,179,179,1)",
        left: 0,
        right: "auto",
      },
      ViewAllAgeGroups: {
        position: "absolute",
        width: 201,
        height: 18,
        transform: [{translateX: 0}, {translateY:45}, {rotate: "0deg"},],
        left: 70,
        //alignSelf: "center",
        right: "auto",
        //fontFamily: "Inter",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 14,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
      ViewAll: {
        position: "absolute",
        width: "auto",
        height: "auto",
        transform: [{translateX: 0}, {translateY:16}, {rotate: "0deg"},],
        left: 70,
        //alignSelf: "center",
        right: "auto",
       // fontFamily: "Inter",
        fontWeight: "700",
        textDecorationLine: "none",
        fontSize: 24,
        color: "rgba(255,255,255,1)",
        textAlign: "left",
        textAlignVertical: "top",
        letterSpacing: 0.1,
      },
    })