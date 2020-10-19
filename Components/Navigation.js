import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Search from './Home/Search'
import Profile from './Profile/Profile'

const Tab = createBottomTabNavigator();

export default function Navigation({ disconnectAccount }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'md-home'
                : 'md-home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'md-search' : 'md-search';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Search} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Settings">
          { () => <Profile disconnectAccount={disconnectAccount} /> }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}