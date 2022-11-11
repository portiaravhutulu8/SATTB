import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import TournamentsScreen from './TabScreens/TournamentsScreen';
import HomeScreen from './TabScreens/HomeScreen';
import ForgotPassword from './ForgotPassword';
import PasswordReset from './PasswordReset';
import SettingsScreen from './TabScreens/SettingsScreen';
import TournamentInfo from './TabScreens/TournamentInfo';
import MainTabScreen from '../MainTabScreen';
import ProfileScreen from './ProfileScreen';
import RankingsScreen from './RankingsScreen';
import ViewProfile from './ViewProfile';
import RegisterButton from './RegisterButton';
import ViewTournaments from './ViewTournaments';
import Form from './Components/Form';
//import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons'; 

const RootStack  = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <NavigationContainer>  
    <RootStack.Navigator initialRouteName='LoginScreen'>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} options= {{headerShown: false}}/>
        <RootStack.Screen name="Register" component={RegisterScreen}  />
        <RootStack.Screen name="ForgotPassword" path="./forgot-password" component={ForgotPassword}  />
        <RootStack.Screen name="PasswordReset" path="./reset-password/:token/:id" element={<PasswordReset/>} component={PasswordReset}  />
        <RootStack.Screen name="Dashboard" component={MainTabScreen} options= {{headerShown: false}} />
        <RootStack.Screen name="Home" component={HomeScreen} options= {{headerShown: false}} />
        <RootStack.Screen name="Tournaments" component={TournamentsScreen} options= {{headerShown: false}} />
        <RootStack.Screen name="RegisterButton" component={RegisterButton} options= {{headerShown: false}} />
        <RootStack.Screen name="ViewTournaments" component={ViewTournaments} options= {{headerShown: false}} />
        <RootStack.Screen name="Settings" component={SettingsScreen} options= {{headerShown: false}} />
        <RootStack.Screen name="Rankings" component={RankingsScreen}  />
        <RootStack.Screen name="Form" component={Form}  />

        <RootStack.Screen 
        name="EditProfile" 
        component={ProfileScreen} 
         />
         <RootStack.Screen 
        name="Profile" 
        component={ViewProfile} 
       
         />
        <RootStack.Screen name="TournamentInfo" component={TournamentInfo} />
        
    </RootStack.Navigator>
    </NavigationContainer>

);

export default RootStackScreen;

