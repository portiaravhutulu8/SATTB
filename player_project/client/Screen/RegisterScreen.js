import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const genderInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

//form handling
  const handleSignup =(credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.8.168:3000/user/signup';

    axios
     .post(url, credentials)
     .then((response) => {
      const result = response.data;
      const {message, status, data} = result;

      if (status !== 'SUCCESS')  {
        handleMessage(message, status);
      } else {
        navigation.navigate('Dashboard', { ...data[0] });
      }
      setSubmitting(false);
     })
     .catch((error) => {
      console.log(error.JSON());
      setSubmitting(false);
      handleMessage("An  error occured. Check your network and try again");
     });
  };

  const handleMessage =  (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,1)'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
         
        </View>
        <KeyboardAvoidingView enabled>
        <Formik
            initialValues={{name: '', email: '', password: '', confirmPassword: '', age: '', gender: '', address: ''}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.name == '' || values.email == '' || values.password == '' || values.confirmPassword == '' || values.age == '' || values.gender == '' || values.address == ''){
                handleMessage('Please fill in all the fields');
                setSubmitting(false);
              } else if(values.password !== values.confirmPassword) {
                handleMessage('Passwords do not match!');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }} 
             >
              {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <SafeAreaView>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={handleChange('name')}
              value={values.name}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={handleChange('email')}
              value={values.email}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
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
              onChangeText={handleChange('password')}
              value={values.password}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
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
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
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
              onChangeText={handleChange('age')}
              value={values.age}
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
              onChangeText={handleChange('gender')}
              value={values.gender}
              underlineColorAndroid="#f000"
              placeholder="Enter Gender"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={genderInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={handleChange('address')}
              value={values.address}
              underlineColorAndroid="#f000"
              placeholder="Enter Home Province"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.MsgBox} type={messageType}>{message}</Text>
          {!isSubmitting && <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress= {handleSubmit}>
                  <Text style={styles.buttonTextStyle}>REGISTER</Text>
                </TouchableOpacity>}

                {isSubmitting && <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  disabled={true}>
                  <ActivityIndicator size="large" color='#FFFFFF' />
                </TouchableOpacity>}
      </SafeAreaView>
            )}
            </Formik>
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
  MsgBox:{
    textAlign: 'center',
    fontSize: 13,
    color: 'red',
  }
});