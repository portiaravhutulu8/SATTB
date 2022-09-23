import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userFirst, setUserFirst] = useState('');
  const [userLast, setUserLast] = useState('');
  const [useremailAddress, setUseremailAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.8.103:8000/api/user/tournaments").then((response) => {
      console.log(response);
      setProfile(response.data);
    });
  }, []);

  /*try {
    axios.get("http://192.168.8.103:8000/api/user/profile").then((response) => {
      //console.log(response);
      setProfile(response.data);
    });
  } catch (error) {
    console.error(error);
  }*/
  //console.log(profile);

  {/*<KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userFirst) => setUserFirst(userFirst)}
              underlineColorAndroid="#f000"
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameInputRef.current && lastNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userLast) => setUserLast(userLast)}
              underlineColorAndroid="#f000"
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailAddressInputRef.current && emailAddressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(useremailAddress) => setUseremailAddress(useremailAddress)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailAddressInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) =>
                setUserPassword(userPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                verifyPasswordInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View> */}
  return (

    <View style={stylesheet.Profilepage}>

      <View style={stylesheet.styleGrayHeader}>
        <AntDesign
          name="arrowleft"
          size={45}
          style={{
            position: 'absolute',
            top: 18,
            left: 15
          }}
          color="rgba(0,0,0,1)"
          onPress={() => navigation.goBack(null)}
        />
      </View>
      <Text h1 bold style={stylesheet.Profile}>
        Profile
      </Text>

      <View>
        <ScrollView>
          {profile.map((val, key) => {
            return (
              <View key={key}>
                <Text style={stylesheet.FirstName}>
                  First Name:
                </Text>
                <Text style={stylesheet.rightSide}>{val.userFirst}</Text>
                <TouchableOpacity
                  style={stylesheet.buttonStyle}
                  activeOpacity={0.5}
                >
                  <Text style={stylesheet.buttonTextStyle}>change</Text>
                </TouchableOpacity>


                <Text style={stylesheet.LastName}>
                  Last Name:
                </Text>
                <Text style={stylesheet.rightSide}>{val.userLast}</Text>
                <TouchableOpacity
                  style={stylesheet.buttonStyle}
                  activeOpacity={0.5}
                >
                  <Text style={stylesheet.buttonTextStyle}>change</Text>
                </TouchableOpacity>


                <Text style={stylesheet.EmailAddress}>
                  Email Address:
                </Text>
                <Text style={stylesheet.rightSide}>{val.useremailAddress}</Text>
                <TouchableOpacity
                  style={stylesheet.buttonStyle}
                  activeOpacity={0.5}
                >
                  <Text style={stylesheet.buttonTextStyle}>change</Text>
                </TouchableOpacity>

                <Text style={stylesheet.Password}>
                  Password:
                </Text>
                <TouchableOpacity
                  style={stylesheet.buttonStyle}
                  activeOpacity={0.5}
                >
                  <Text style={stylesheet.buttonTextStyle}>change</Text>
                </TouchableOpacity>

              </View>
            )
          })}

        </ScrollView>
      </View>
    </View>


  );

}

export default ProfileScreen;

const stylesheet = StyleSheet.create({
  Profilepage: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 800,
    borderRadius: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
    backgroundColor: "rgba(255,255,255,1)",
    left: 0,
    top: 0,
  },


  FirstName: {
    position: "absolute",
    width: 306,
    height: 50,
    left: 25,
    right: "auto",
    top: 166,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
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
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
    //fontFamily: "Inter",
    fontWeight: "700",
    textDecorationLine: "none",
    fontSize: 32,
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    textAlignVertical: "top",
    letterSpacing: 0.1,
  },
  Password: {
    position: "absolute",
    width: 306,
    height: 50,
    left: 25,
    right: "auto",
    top: 400,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
    //fontFamily: "Inter",
    fontWeight: "700",
    textDecorationLine: "none",
    fontSize: 20,
    color: "rgba(0,0,0,1)",
    textAlign: "left",
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
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
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
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" },],
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
  }, inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  }, SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,

    alignContent: "center",
    borderRadius: 30,
    marginLeft: 300,
    marginRight: 35,
    marginTop: 150,
    marginBottom: -100,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})