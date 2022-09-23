import React from 'react';
import { Dimensions, Image, ScrollView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const RegisteredTournamentsScreen = () => {


  /*try {
    let res = axios.post("http://192.168.0.107:8000/api/user/tournaments").then((response) => {
      console.log(response)
    })
    console.log(res)
  } catch (err) {
    console.error(err);
  };*/
  const check = async () => {
    try {
      let res = await axios.get("http://192.168.8.103:8000/api/user/rigesteredTournaments", {
      })
      console.log(res);


    } catch (err) {
      console.error(err);
    };
  }


  return (
    <View style={stylesheet.Tournaments}>
      <View style={stylesheet.TournamentsCont}>
      </View>
      <Image
        source={require('/Users/zaid/Desktop/MSA studies/2022/Second Semester/IE/client/Image/TournamentHeader.png')}
        style={stylesheet.styleTournamentHeader}>
      </Image>


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text>No Registered Tournaments.</Text>
      </View>
    </View>
  );
};

export default RegisteredTournamentsScreen;

const stylesheet = StyleSheet.create({
  Tournaments: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 800,
    borderRadius: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
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
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
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