import React, {useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'react-router-dom';

//API client
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();


  const handleLogin =(credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.8.168:3000/user/signin';

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
      //console.log(error.JSON());
      setSubmitting(false);
      handleMessage("An  error occured. Check your network and try again");
     });
  };

  const handleMessage =  (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

    const passwordInputRef = createRef();

    return (
        <View style={styles.mainBody}>
          <Image style={styles.MainPageHeaderImage} source={{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/YcKxdBFJPrfjR63lzPnTWAiS.png" }}>
        </Image>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View>
              <KeyboardAvoidingView enabled>
                <View style={{alignItems: 'center'}}>
                  
                </View>
                <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => {
                  if (values.email == '' || values.password == ''){
                    handleMessage('Please fill in all the fields');
                    setSubmitting(false);
                  } else {
                    handleLogin(values, setSubmitting);
                  }
                }}
                >
                  {({ handleChange, handleSubmit, values, isSubmitting}) => (
                    <SafeAreaView>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    isPassword={true}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
               <Text style={styles.MsgBox} type={messageType}>{message}</Text>
                {!isSubmitting && <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress= {handleSubmit}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>}

                {isSubmitting && <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  disabled={true}>
                  <ActivityIndicator size="large" color='#FFFFFF' />
                </TouchableOpacity>}

                <Text
                  style={styles.registerTextStyle}
                  onPress={ () => navigation.navigate('Register')}>
                  Don't have an account ? Register
                </Text>
                
                <Text
                style={styles.forgotPassTextStyle}
                onPress={ () => navigation.navigate('ForgotPassword')}>
                Forgot Password?
                </Text>
                
                </SafeAreaView>
                )}
                </Formik>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      );
    };
    export default LoginScreen;
    
    const styles = StyleSheet.create({
      mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        alignContent: 'center',
      },
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
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
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
      registerTextStyle: {
        color: 'rgba(0,0,0,1)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
      },
      forgotPassTextStyle: {
        color: '#039BE5',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
      MainPageHeaderImage: {
        position: "absolute",
        //left: 76,
        top: 140,
        bottom: 980,
        alignSelf: "center",
        borderRadius: null,
        width: 184,
        height: 55,
      },
      MsgBox:{
        textAlign: 'center',
        fontSize: 13,
        color: 'red',
      }
    });
