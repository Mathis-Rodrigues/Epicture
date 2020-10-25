import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
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
  const [focusedAvatar, setFocusedAvatar] = useState(0)
  const [avatarName, setAvatarName] = useState(data.avatar_name)
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const rep = await getAvatarList(token, data.url)
      setAvatarList(rep.data.available_avatars)
      setUserAvatar(rep.data.available_avatars.find(e => e.name === data.avatar_name).location)
      console.log(rep.data.available_avatars.find(e => e.name === data.avatar_name).location)
    })()

  }, [])

  const updateAvatar = (i, e) => {
    setFocusedAvatar(i)
    setUserAvatar(e.location)
    setAvatarName(e.name)
  }

  const updateSettings = () => {
    changeAccountSetting(token, usernameText, bioText, avatarName).then(rep => console.log(rep))
  }
  return (
    <View style={{ flex: 1 }}>
      <Modal transparent visible={isOpen} animationType={"slide"}>
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => setIsOpen(false)} >
              <Icon active name="ios-close" style={{ fontSize: 80, marginLeft: 20 }} />
            </TouchableOpacity>
            <Text style={{ alignSelf: "center", marginRight: 40, fontSize: 18, fontWeight: "700", color: "white" }}>CHOOSE A PICTURE</Text>
            <Text style={{ alignSelf: "center" }}></Text>
          </View>
          <ScrollView style={{ flex: 1, backgroundColor: 'grey', }}>
            <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }} >
              {avatarList && avatarList.map((e, i) => (
                <TouchableOpacity onPress={() => updateAvatar(i, e)} key={i}>
                  <Image style={i === focusedAvatar ? styles.avatarFocus : styles.avatar} source={{ uri: e.location }} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Button transparent onPress={navigation.openDrawer} style={styles.drawerButton}>
        <Icon name='menu' style={{ fontSize: 33, color: 'black' }} />
      </Button>
      <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 20, fontWeight: "700" }}>EDIT PROFILE</Text>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image source={{ uri: userAvatar }} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
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
  },
  avatarFocus: {
    borderColor: 'black',
    borderWidth: 4,
    height: 100,
    width: 100,
    borderRadius: 100
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100
  }
})

export default Settings