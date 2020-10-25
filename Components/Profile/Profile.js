import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'

import InfoProfile from './InfoProfile'
import Settings from './Settings'
import MyImagesTab from './MyImagesTab'
import MyAlbumTab from './MyAlbumTab'
import MyFavoritesTab from './MyFavoritesTab'

import {
  drawerBackgroundColor,
  globalBlueColor,
  drawerReverseTextColor,
  drawerTextColor
} from '../../config/theme'
import { getMyAccountParams, getMySettings } from '../../API/API'

const Categories = [
  {
    name: 'Images',
    label: 'IMAGES',
    component: MyImagesTab
  },
  {
    name: 'Albums',
    label: 'ALBUMS',
    component: MyAlbumTab
  },
  {
    name: 'Favorites',
    label: 'FAVORITES',
    component: MyFavoritesTab
  }
]

function CustomDrawerContent(props) {
  const { data, disconnectAccount } = props
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
        <Image source={{ uri: data.avatar + `&nocache=${data.avatar_name}` }} style={{ width: 80, height: 80, borderRadius: 100 }} />
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

const ProfileWrapper = ({ data, selectedCategory, setCategory, token }) => {
  const Component = Categories.find(e => e.name === selectedCategory).component

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <InfoProfile
        data={data}
        categories={Categories}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
      />
      <Component token={token} />
    </View>
  )
}

function Profile({ disconnectAccount }) {
  const [accountParams, setAccountParams] = useState(null)
  const [myData, setMyData] = useState(null)
  const [category, setCategory] = useState(Categories[0].name)
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      setAccountParams(acc)
      const res = await getMyAccountParams(acc.access_token)
      setMyData(res.data)
    })()
  }, [])

  return (accountParams && myData && !console.log(myData) &&
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => <Ionicons name={route.name === "Profile" ? "ios-person" : "md-settings"} size={size} color={color} />
      })}
      initialRouteName="Profile"
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerContent={(props) => <CustomDrawerContent {...props} data={myData} disconnectAccount={disconnectAccount} />}
      drawerContentOptions={{
        inactiveTintColor: drawerTextColor,
        activeTintColor: globalBlueColor,
      }}
    >
      <Drawer.Screen name="Profile">
        {() => <ProfileWrapper
          data={myData}
          selectedCategory={category}
          setCategory={setCategory}
          token={accountParams.access_token}
        />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {() => <Settings
          data={myData}
          token={accountParams.access_token}
          setData={setMyData}
        />}
      </Drawer.Screen>
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