import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icon, Subtitle, Title, Button } from 'native-base'

import { changeAccountSetting } from '../../API/API'
import { useNavigation } from '@react-navigation/native'




function Settings({ data, settings, token }) {
  // console.log(data)
  // console.log(token)
  const [usernameText, setUsernameText] = useState(data.url)
  const [bioText, setBioText] = useState(data.bio)
  const navigation = useNavigation()


  const updateSettings = () => {
    // console.log(usernameText)
    changeAccountSetting(token, usernameText, bioText).then(rep => console.log(rep))
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Button transparent onPress={navigation.openDrawer} style={styles.drawerButton}>
        <Icon name='menu' style={{ fontSize: 33, color: 'black' }} />
      </Button>
      <Text style={{alignSelf: "center", fontSize: 20, marginTop: 20, fontWeight: "700"}}>EDIT PROFILE</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image source={{ uri: data.avatar }} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
      </View>
      <Text style={{ marginTop: 70, marginLeft: 25, color: 'grey' }}>Username</Text>
      <View style={{ flexDirection: "row", marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          style={{ color: 'black', fontSize: 20 }}
          onChangeText={setUsernameText}
        >{data.url}</TextInput>
      </View>
      <Text style={{ marginTop: 40, marginLeft: 25, color: 'grey' }}>Bio</Text>
      <View style={{ flexDirection: "row", marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
        <TextInput
          placeholder="Write your bio here"
          placeholderTextColor="grey"
          style={{ color: 'black', fontSize: 20 }}
          multiline={true}
          onChangeText={setBioText}
        >{data.bio}</TextInput>
      </View>
      <TouchableOpacity onPress={() => updateSettings()} style={{alignSelf: 'center', marginTop: 40, backgroundColor: '#3399FF', borderRadius: 10, height: 35, width: 100 }}>
        <Text style={{ fontSize: 25, alignSelf: "center", fontWeight: "700", color: 'white'}}>SAVE</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  drawerButton: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})

export default Settings