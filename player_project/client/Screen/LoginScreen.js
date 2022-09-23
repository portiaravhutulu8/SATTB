import React, {useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import Loader from './Components/Loader';
import { AuthContext } from "./Components/context"

const LoginScreen = ({navigation}) => {

  const [data, setData] = React.useState({
    userName: '',
    password: '',
    
  });
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const { signIn } = React.useContext(AuthContext);


    const loginHandle = (userName, password) => {
      signIn(userName, password);
    }

    return (
        <View style={styles.mainBody}>
          <Loader loading={loading} />
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
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(userName) =>
                      setUserName(userName)
                    }
                    placeholder="Enter Username" //dummy@abc.com
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
                    onChangeText={(UserPassword) =>
                      setUserPassword(UserPassword)
                    }
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
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errortext}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress= { () => {loginHandle(data.userName, data.password)}}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
                <Text
                  style={styles.registerTextStyle}
                  onPress={ () => navigation.navigate('Register')}>
                  Don't have an account ? Register
                </Text>
                <Text
                style={styles.forgotPassTextStyle}
                onPress={ () => navigation.navigate('Forgot Password?')}>
                Forgot Password?
                </Text>
               
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
    });
