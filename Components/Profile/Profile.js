import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'

import InfoProfile from './InfoProfile'

import {
  drawerBackgroundColor,
  globalBlueColor,
  drawerReverseTextColor,
  drawerTextColor
} from '../../config/theme'
import { getMyAccountParams, getMySettings } from '../../API/API'

const Categories = [
  {
    name: 'Posts',
    label: 'POSTS',
  },
  {
    name: 'Favorites',
    label: 'FAVORITES',
  },
  {
    name: 'About',
    label: 'ABOUT',
  },
]

function CustomDrawerContent(props) {
  const { data, disconnectAccount } = props
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
        <Image source={{ uri: data.avatar }} style={{ width: 80, height: 80, borderRadius: 100, }} />
        <Text style={styles.drawerTitle}>{data.url}</Text>
        <Text style={styles.drawerSubtitle}>{data.reputation}{" • "}{data.reputation_name}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Disconnect"
        icon={({ color, size }) => <Ionicons name={"ios-log-out"} size={size} color={color} />}
        inactiveBackgroundColor={globalBlueColor}
        inactiveTintColor={drawerReverseTextColor}
        onPress={disconnectAccount}
      />
    </DrawerContentScrollView>
  );
}

function Profile({ disconnectAccount }) {
  const [accountParams, setAccountParams] = useState(null)
  const [myData, setMyData] = useState(null)
  const [mySettings, setMySettings] = useState(null)
  const [category, setCategory] = useState(Categories[0].name)
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      setAccountParams(acc)
      setMyData(await getMyAccountParams(acc.access_token))
      setMySettings(await getMySettings(acc.access_token))
    })()
  }, [])

  return (accountParams && myData && mySettings &&
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => <Ionicons name={route.name === "Profile" ? "ios-person" : "md-settings"} size={size} color={color} />
      })}
      initialRouteName="Profile"
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerContent={(props) => <CustomDrawerContent {...props} data={myData.data} disconnectAccount={disconnectAccount} />}
      drawerContentOptions={{
        inactiveTintColor: drawerTextColor,
        activeTintColor: globalBlueColor,
      }}
    >
      <Drawer.Screen name="Profile">
        {() => <InfoProfile
          data={myData.data}
          categories={Categories}
          selectedCategory={category}
          setCategory={setCategory}
        />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={View} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: drawerBackgroundColor,
  },
  drawerTitle: {
    color: drawerTextColor,
    fontWeight: '700',
    fontSize: 20,
    marginTop: 10
  },
  drawerSubtitle: {
    color: drawerTextColor,
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 20
  },
  disconnectButton: {
    backgroundColor: globalBlueColor,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 17,
  }
})

export default Profile