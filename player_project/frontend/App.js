import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './MainTabScreen';
import TournamentsScreen from './Screen/DrawerScreens/TournamentsScreen';
import ProfileScreen from './Screen/ProfileScreen';
import { AuthContext } from './Screen/Components/context';
import RegisterButton from './Screen/RegisterButton';
import RootStackScreen from './Screen/RootStackScreen';
import { ActivityIndicator } from 'react-native-paper';
import { Switch } from 'react-native-gesture-handler';
import RankingsScreen from './Screen/RankingsScreen';
//import RegisterScreen from './Screen/RegisterScreen';
import { Logs } from 'expo';
import HomeScreen from './Screen/DrawerScreens/HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] =React.useState(true);
  const [userToken, setUserToken] =React.useState(null);

  const initialLoginState ={
    isLoading: true,
    userName: null,
    userToken: null,
    isSignout: true,

  };

  const loginReducer =(prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return{
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
          isSignout: false,
        };
      case 'LOGOUT':
          return{
      
            userName: null,
            userToken: null,
            isLoading: false,
            isSignout: true,
          };
      case 'REGISTER':
            return{
              ...prevState,
              userToken: action.token,
              userName: action.id,
              isLoading: false,
            };
    }

  };


  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: () => {
      //setUserToken('abcd');
      //setIsLoading(false);
      let userToken;
      userName= null;
      if(userName == 'user' && password == 'password') {
        userToken = 'abcd';
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: () => {
      let userToken;
      userToken== null;
      setUserToken(null);
      setIsLoading(false);
      dispatch({ type: 'LOGOUT', token: userToken });
    },
    signUp: () => {
      setUserToken('abcd');
      setIsLoading(false);
    },

  }), []);

  useEffect(() => {
    setTimeout(() => {
      //setIsLoading(false);
      let userToken;
      userToken = 'abc';
      console.log('user token: ', userToken);

      dispatch({ type: 'RETRIEVE_TOKEN',  token: userToken });
    },
    1000);

  },
  []);


  if( loginState.isLoading ) {
    return(
      <View style = {{flex:1, justifyContent: 'center,', alignItems: 'center', top: 350}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null? (
        <Drawer.Navigator drawerContent={props => <DrawerContent { ...props}/>}>
        <Drawer.Screen name="Dashboard" component={MainTabScreen} options= {{headerShown: false}} />
        <Drawer.Screen name="Tournaments" component={TournamentsScreen} />
        <Drawer.Screen name="RegisterButton" component={RegisterButton} options= {{headerShown: false}} />
        <Drawer.Screen name="RankingsScreen" component={RankingsScreen} options= {{headerShown: false}} />
        <Drawer.Screen name="Home" component={HomeScreen} options= {{headerShown: false}} />


        <Drawer.Screen 
  name="ProfileScreen"
  component={ProfileScreen} 
  options= {{headerShown: false}}/>
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
     
      {/*<Drawer.Navigator drawerContent={props => <DrawerContent { ...props}/>}>
        <Drawer.Screen name="Dashboard" component={MainTabScreen} options= {{headerShown: false}} />
        <Drawer.Screen name="Tournaments" component={TournamentsScreen} />
  </Drawer.Navigator>*/}
  
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

Logs.disableExpoCliLogging();

export default App;