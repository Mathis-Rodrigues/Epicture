import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Search from './Home/Search'
import Profile from './Profile/Profile'
import Upload from './Upload/Upload'
import PermissionManager from './Upload/PermissionManager'

const Tab = createBottomTabNavigator();

const iconList = [
  {
    tab: "Home",
    icon: "md-home",
    iconFocused: "md-home"
  },
  {
    tab: "Settings",
    icon: "ios-list",
    iconFocused: "ios-list-box"
  },
  {
    tab: "Search",
    icon: "md-search",
    iconFocused: "md-search"
  },
  {
    tab: "Posts",
    icon: "ios-camera",
    iconFocused: "ios-camera"
  },
]

const UploadWrapper = ({ navigation }) => (
  <PermissionManager navigation={navigation}>
    <Upload />
  </PermissionManager>
)

export default function Navigation({ disconnectAccount }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const { icon, iconFocused } = iconList.find(e => e.tab == route.name)
            return <Ionicons name={focused ? iconFocused : icon} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Search} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Posts" component={UploadWrapper}>
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => <Profile disconnectAccount={disconnectAccount} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}