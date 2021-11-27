import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';
import Settings from './src/pages/Settings';

const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{unmountOnBlur: true}} >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarIcon: () => <Ionicons name="briefcase-outline" size={35} color="#CCC" /> }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ tabBarIcon: () => <Ionicons name="ellipsis-vertical-circle-outline" size={35} color="#CCC" /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;