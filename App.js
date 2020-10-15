import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation from './Components/Navigation'
import Setup from './Components/Setup'


// const Tab = createBottomTabNavigator();

export default function App() {
    return(
      <Setup/>
    );
}