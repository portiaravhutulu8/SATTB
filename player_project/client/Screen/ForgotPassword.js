import React, { Fragment, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Button} from 'react-native';
import {Formik} from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

const ForgotPassword =() => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleSubmit =(email, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.8.168:3000/user/forgot-password';
    
        axios
         .post(url, email)
         .then((response) => {
          const result = response.data;
          const {message, success, data} = result;
    
          if (success !== 'true')  {
            handleMessage(message, success);
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
   
        return (
            <SafeAreaView style={stylesheet.container}>
                
                <Formik 
                 initialValues={{email: ''}}
                 onSubmit={(values, {setSubmitting}) => {
                   if (values.email == ''){
                     handleMessage('Please fill in email');
                     setSubmitting(false);
                   } else {
                     handleSubmit(values, setSubmitting);
                   }
                 }}
                >
                 {({
                    isValid,
                    handleBlur,
                    handleChange, handleSubmit, values, isSubmitting
                 }) => (
                    <Fragment>
                     <View style={stylesheet.SectionStyle}>
                        <TextInput
                        style={stylesheet.inputStyle}
                        name='email'
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholder= 'Enter email'
                        autoCapitalize='none'
                        onBlur={handleBlur('email')}
                        />
                        </View>
                        <Text style={stylesheet.MsgBox} type={messageType}>{message}</Text>

                        <View style={stylesheet.buttonContainer}>

                            <Button
                            title='Send Email'
                            buttonType='outline'
                            onPress={handleSubmit}
                            buttonColor='#039BE5'
                            disabled={!isValid || isSubmitting}
                            />
                        </View>
                    </Fragment>
                 )}  
                </Formik>
            </SafeAreaView>
        )
        
};

export default ForgotPassword;

const stylesheet = StyleSheet.create({

   container:{
    flex: 1,
    backgroundColor: '#fff',
   },
   buttonContainer: {
    margin: 25,
   },
   SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
  error_msg: {
    textAlign: 'center',
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#f34646',
    fontSize: 14,
    margin: 5,
    padding: 15,

  },
  success_msg: {
    textAlign: 'center',
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#5cdd5c',
    fontSize: 14,
    margin: 5,
    padding: 15,
  },
  MsgBox: {
    alignSelf: 'center',
    color: 'red',
  }
});