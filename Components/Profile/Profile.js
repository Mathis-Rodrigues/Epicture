import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import InfoProfile from './InfoProfile'

import {
  drawerBackgroundColor,
  globalBlueColor,
  drawerReverseTextColor,
  drawerTextColor
} from '../../config/theme'
import { getMyAccountParams, getMySettings } from '../../API/API'
import { TouchableOpacity } from 'react-native-gesture-handler';

function CustomDrawerContent(props) {
  const { data, disconnectAccount } = props
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image source={{ uri: data.avatar }} style={{ width: 80, height: 80, borderRadius: 100, }} />
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={disconnectAccount} style={styles.disconnectButton}>
        <Text style={{ color: drawerReverseTextColor }}>Disconnect</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function Profile({ disconnectAccount }) {
  const [accountParams, setAccountParams] = useState(null)
  const [myData, setMyData] = useState(null)
  const [mySettings, setMySettings] = useState(null)
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
      initialRouteName="Profile"
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerContent={(props) => <CustomDrawerContent {...props} data={myData.data} disconnectAccount={disconnectAccount} />}
    >
      <Drawer.Screen name="Profile">
        {() => <InfoProfile data={myData.data} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={View} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: drawerBackgroundColor,
    // position: 'relative'
  },
  disconnectButton: {
    backgroundColor: globalBlueColor,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  }
})

export default Profile