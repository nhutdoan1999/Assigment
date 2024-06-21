import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './sc/HomeScreen';
import LoginScreen from './sc/LoginScreen';
import AddScreen from './sc/AddScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from './sc/DetailScreen';
import UpdateScreen from './sc/UpdateScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Service" component={AddScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen name="Update Service" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;