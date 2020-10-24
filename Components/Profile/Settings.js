import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'


function Settings({ data, settings }) {
  console.log(data)
  return (
    <View style={{ flex: 1, flexDirection: 'column'}}>
      <View style={{flexDirection: "row", justifyContent: "center" }}>
        <Image source={{ uri: data.avatar }} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 40, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30}}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          style={{ color: 'black', fontSize: 20}}
        >{data.url}</TextInput>
      </View>
      <TouchableOpacity onPress={() => console.log("xd")}>
        <Text style={{fontSize: 40, alignSelf: 'center', marginTop: 40}}>Save</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Settings