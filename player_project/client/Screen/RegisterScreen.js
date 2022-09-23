import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Loader from './Components/Loader';
import client from '../API/client';
import axios, { Axios } from 'axios';
import { Error } from 'parse';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = (props) => {
  const [userFirst, setUserFirst] = useState('');//Zaid made changes to add first and last name 
  const [userLast, setUserLast] = useState('');
  const [useremailAddress, setUseremailAddress] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userprovince, setUserprovince] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userverifyPassword, setUserverifyPassword] = useState('');//Zaid made changes
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);
  const navigation = useNavigation();


  const emailAddressInputRef = createRef();
  const lastNameInputRef = createRef();
  const ageInputRef = createRef();
  const genderInputRef = createRef();
  const provinceInputRef = createRef();
  const passwordInputRef = createRef();
  const verifyPasswordInputRef = createRef();

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userFirst) {
      alert('Please fill in First Name');
      return;
    }
    if (!userLast) {
      alert('Please fill in Last Name');
      return;
    }
    if (!useremailAddress) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userGender) {
      alert('Please fill Gender');
      return;
    }
    if (!userprovince) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userverifyPassword) {
      alert('Please Confirm Password');
      return;
    }
    //Show Loader
    setIsRegistraionSuccess(true);
    var dataToSend = {
      firstName: userFirst,
      lastName: userLast,
      emailAddress: useremailAddress,
      password: userPassword,
      verifyPassword: userverifyPassword,
      age: userAge,
      gender: userGender,
      province: userprovince,


    };
    

    //console.log(dataToSend);

    /* = await client.post("/create", {
      dataToSend,
    });*/
    try {
      let res = await axios.post("http://192.168.8.103:8000/api/user/create", {
        firstName: userFirst,
        lastName: userLast,
        emailAddress: useremailAddress,
        password: userPassword,
        verifyPassword: userverifyPassword,
        age: userAge,
        gender: userGender,
        province: userprovince
      })
      console.log(res);


    } catch (err) {
      console.error(err);
    };

    //setLoading(false);

    if (isRegistraionSuccess)//if registration is successful, navigate to login screen to login.
    {
      alert('Registration successful');//Success message to let user know registration is successful,and navigates to login screen
      navigation.navigate('LoginScreen');
      return;
    }










  };
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,1)' }}>
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>

        </View>
        <KeyboardAvoidingView enabled>
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
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userverifyPassword) =>
                setUserverifyPassword(userverifyPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={verifyPasswordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userAge) => setUserAge(userAge)}
              underlineColorAndroid="#f000"
              placeholder="Enter Age"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                genderInputRef.current &&
                genderInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userGender) => setUserGender(userGender)}
              underlineColorAndroid="#f000"
              placeholder="Enter Gender"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={genderInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                provinceInputRef.current &&
                provinceInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userprovince) =>
                setUserprovince(userprovince)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Address"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={provinceInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
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
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});