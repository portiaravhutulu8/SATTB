import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import TournamentsScreen from './DrawerScreens/TournamentsScreen';
import HomeScreen from './DrawerScreens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import TournamentInfo from './DrawerScreens/TournamentInfo';

const RootStack  = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    
    <RootStack.Navigator >
        <RootStack.Screen name="LoginScreen" component={LoginScreen} options= {{headerShown: false}}/>
        <RootStack.Screen name="Register" component={RegisterScreen}  />
        <RootStack.Screen name="Home" component={HomeScreen}  />
        <RootStack.Screen name="Tournaments" component={TournamentsScreen}  />
        <RootStack.Screen name="Settings" component={SettingsScreen}  />
        <RootStack.Screen name="TournamentInfo" component={TournamentInfo} />
        


    </RootStack.Navigator>
 

);

export default RootStackScreen;

