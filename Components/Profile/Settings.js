import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Butt } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { changeAccountSetting } from '../../API/API'



function Settings({ data, settings, token }) {
  // console.log(data)
  // console.log(token)
  const [usernameText, setUsernameText] = useState(data.url)
  const [bioText, setBioText] = useState(data.bio)

  const updateSettings = () => {
    console.log("wowowowowo")
    changeAccountSetting(token, data.url, bioText).then(rep => console.log(rep))
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image source={{ uri: data.avatar }} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 40, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          style={{ color: 'black', fontSize: 20 }}
          onChangeText={setUsernameText}
        >{data.url}</TextInput>
      </View>
      <View style={{ flexDirection: "row", marginTop: 40, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
        <TextInput
          placeholder="Write your bio here"
          placeholderTextColor="grey"
          style={{ color: 'black', fontSize: 20 }}
          multiline={true}
          onChangeText={setBioText}
        >{data.bio}</TextInput>
      </View>
      {/* <View style={{ marginTop: 40, borderWidth: 1, borderColor: 'grey', marginLeft: 30, marginRight: 30, borderRadius: 50, height: 150}}> */}

      {/* <TextInput
      placeholder="Write your bio here"
      placeholderTextColor="grey"
      style={{color: 'black', fontSize: 20, marginTop: 40, borderWidth: 1, borderColor: 'grey', marginLeft: 30, marginRight: 30, borderRadius: 20, height: 200, paddingBottom: 10}}
      multiline={true}
      >{data.bio}</TextInput> */}
      {/* </View> */}
      <TouchableOpacity onPress={() => updateSettings()} style={{ fontSize: 40, alignSelf: 'center', marginTop: 40, backgroundColor: '#00CCCC', borderRadius: 10, height: 60, width: 100 }}>
        <Text style={{ fontSize: 40, alignSelf: "center" }}>Save</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Settings