import React from 'react';
import icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Screen/TabScreens/HomeScreen';
import TournamentsScreen from './Screen/TabScreens/TournamentsScreen';
import RegisteredTournamentsScreen from './Screen/TabScreens/RegisteredTournamentsScreen';
import SettingsScreen from './Screen/TabScreens/SettingsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return(
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="rgba(0,0,0,1)"
      barStyle={{ backgroundColor: "rgba(235,235,235,1)" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          tabBarLabel: 'Tournaments',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tennis-ball" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="RegisteredTournaments"
        component={RegisteredTournamentsScreen}
        options={{
          tabBarLabel: 'Registered Tournaments',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tennis" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    )
    }

    
export default MainTabScreen;