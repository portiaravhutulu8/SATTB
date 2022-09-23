import React, {Component, Fragment} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import { withFirebaseHOC } from '../config/Firebase';

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
})

class ForgotPassword extends Component {
    handlePasswordReset =async (values, actions) => {
        const {email} =values;

        try{
            await this.props.firebase.passwordReset(email);
            console.log('Password reset email sent successfully');
            this.props.navigation.navigate('LoginScreen');
        } catch (error) {
            actions.setFieldError('general', error.message);
        }
    };

    render() {
        return (
            <SafeAreaView style={stylesheet.container}>
                
                <Formik 
                initialValues={{email: ''}}
                onSubmit={(values,actions) => {
                    this.handlePasswordReset(values, actions)
                }}
                validationSchema={validationSchema}>
                 {({
                    handleChange,
                    values,
                    handleSubmit,
                    errors,
                    isValid,
                    touched,
                    handleBlur,
                    isSubmitting
                 }) => (
                    <Fragment>
                     <View style={stylesheet.SectionStyle}>
                        <TextInput
                        style={stylesheet.inputStyle}
                        name='email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder= 'Enter email'
                        autoCapitalize='none'
                        onBlur={handleBlur('email')}
                        />
                        </View>
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
        
    }
};

export default withFirebaseHOC(ForgotPassword);

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
});