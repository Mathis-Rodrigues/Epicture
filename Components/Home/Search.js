import React, { Component, useEffect, useState } from 'react';
import { Header, Item, Input, Icon, Button, Text, Picker } from 'native-base';
import { View, FlatList, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Gallery from './Gallery'

import { start, searchGallery, sortGallery } from '../../API/API'
import { headerBackgroundColor } from '../../config/theme'

export default function Search() {
  const [searchedText, setSearchedText] = useState("")
  const [section, setSection] = useState("top")
  const [sort, setSort] = useState("viral")
  const [data, setData] = useState(null)
  const [accountParams, setAccoutParams] = useState(null)

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      start(acc.access_token).then(rep => setData(rep.data))
      setAccoutParams(acc)
    })()
  }, [])

  const onValueChange = (value) => {
    sortGallery(accountParams.access_token, value, sort).then(rep => setData(rep.data))
    if (this.searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, value).then(rep => setData(rep.data))
    }
    setSection(value)
  }

  const onValueChange2 = (value) => {
    sortGallery(accountParams.access_token, section, value).then(rep => setData(rep.data))
    if (this.searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, value).then(rep => setData(rep.data))
    }
    setSort(value)
  }

  const searchTextInputChanged = (text) => {
    setSearchedText(text)
  }

  const loadSearch = () => {
    if (this.searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, sort).then(rep => setData(rep.data))
    } else {
      sortGallery(accountParams.access_token, section, sort).then(rep => setData(rep.data))
    }
  }

  const setFavoriteById = (id, value) => {
    data.find(e => e.id === id).favorite = value
    setData(data)
  }

  return (
    <View>
      <Header searchBar style={{ backgroundColor: headerBackgroundColor }} androidStatusBarColor={headerBackgroundColor} >
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={searchTextInputChanged}
            onSubmitEditing={loadSearch}
          />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          note
          mode="dropdown"
          style={{ width: 120, color: 'black' }}
          selectedValue={section}
          onValueChange={onValueChange.bind(this)}
        >
          <Picker.Item label="Most viral" value="top" />
          <Picker.Item label="User submitted" value="user" />
        </Picker>
        <Picker
          note
          mode="dropdown"
          style={{ width: 120, color: 'black' }}
          selectedValue={sort}
          onValueChange={onValueChange2.bind(this)}
        >
          <Picker.Item label="Popular" value="viral" />
          <Picker.Item label="Best" value="top" />
          <Picker.Item label="Newest" value="time" />
        </Picker>
      </View>
      {/* <Gallery></Gallery> */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Gallery info={item} setFavoriteById={setFavoriteById} />}
      />
      {/* <Button onPress={() => { console.log(data)}}>
          <Text>hey</Text>
        </Button> */}
    </View>
  );
}
