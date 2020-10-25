import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Modal} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icon, Subtitle, Title, Button } from 'native-base'

import { changeAccountSetting, getAvatar, getAvatarList } from '../../API/API'
import { useNavigation } from '@react-navigation/native'




// function avatarModal({avatarList}) {


// }

function Settings({ data, settings, token }) {
  // console.log(data)
  // console.log(token)
  const [usernameText, setUsernameText] = useState(data.url)
  const [bioText, setBioText] = useState(data.bio)
  const [userAvatar, setUserAvatar] = useState("https://i.imgur.com/WM6zUJu_d.png?maxwidth=290&fidelity=grand")
  const [avatarList, setAvatarList] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      // getAvatar(token, data.url).then(rep => setUserAvatar(rep.data.avatar))
      // console.log(data.avatar)
      const rep = await getAvatarList(token, data.url)
      setAvatarList(rep.data.available_avatars)
      setUserAvatar(rep.data.available_avatars.find(e =>  e.name === data.avatar_name).location)
      console.log(rep.data.available_avatars.find(e =>  e.name === data.avatar_name).location)
    })()

  }, [])

  const updateSettings = () => {
    console.log(userAvatar)
    // console.log(data)
    changeAccountSetting(token, usernameText, bioText).then(rep => console.log(rep))
  }
  return (
    <View style={{ flex: 1}}>
        {/* <Modal transparent visible={isOpen} animationType={"slide"}>
          <View style={}
        </Modal> */}
      <Button transparent onPress={navigation.openDrawer} style={styles.drawerButton}>
        <Icon name='menu' style={{ fontSize: 33, color: 'black' }} />
      </Button>
      <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 20, fontWeight: "700" }}>EDIT PROFILE</Text>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image source={{ uri: userAvatar}} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => updateSettings()} style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#3399FF', borderRadius: 10, height: 35, width: 100 }}>
        <Text style={{ fontSize: 25, alignSelf: "center", fontWeight: "700", color: 'white' }}>SAVE</Text>
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