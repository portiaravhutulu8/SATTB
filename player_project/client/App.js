import 'react-native-gesture-handler';
import React from 'react';
import RootStackScreen from './Screen/RootStackScreen';

//const Drawer = createDrawerNavigator();
//const Stack = createStackNavigator();

export default function App() {
  
  return  <RootStackScreen />;
        {/*
        <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={MainTabScreen} options= {{headerShown: false}} />
        <Stack.Screen name="Tournaments" component={TournamentsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}  />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options= {{headerShown: false}}/>
        <Stack.Screen name="RegisterButton" component={RegisterButton} options= {{headerShown: false}} />
        <Stack.Screen name="RankingsScreen" component={RankingsScreen} options= {{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options= {{headerShown: false}} />
        <Stack.Screen name="Edit Profile" component={ProfileScreen}  />
        <Stack.Screen 
        name="Profile" 
        component={ViewProfile}
        options={{
          headerRight: () => (
            <Icon.Button
            name="account-edit"
            size={25}
            backgroundColor="#fff"
            color="#000"
            onPress={() => navigation.navigate('Edit Profile')}
            />
          ),
        }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options= {{headerShown: false}} />
        <Stack.Screen name="TournamentInfo" component={TournamentInfo} options= {{headerShown: false}}/>
        </Stack.Navigator>
      */}
       
}

//export default App;