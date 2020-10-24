import React, { useEffect, useState } from 'react';
import { Header, Button, Text, Item, Input, Icon, Picker, Right, Spinner } from 'native-base';
import { View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Gallery from './Gallery'

import { start, searchGallery, sortGallery } from '../../API/API'
import { headerBackgroundColor, androidHeaderColor, spinnerColor } from '../../config/theme'

export default function Search() {
  const [searchedText, setSearchedText] = useState("")
  const [section, setSection] = useState("top")
  const [sort, setSort] = useState("viral")
  const [data, setData] = useState(null)
  const [accountParams, setAccoutParams] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      start(acc.access_token).then(rep => setData(rep.data))
      setAccoutParams(acc)
    })()
  }, [])

  const onSectionChange = (value) => {
    loadSearch()
    setSection(value)
  }

  const onSortChange = (value) => {
    loadSearch()
    setSort(value)
  }

  const loadSearch = async () => {
    setIsLoading(true)
    if (searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    } else {
      sortGallery(accountParams.access_token, section, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    }
  }

  const setFavoriteById = (id, value) => {
    const _data = [...data]
    _data.find(e => e.id === id).favorite = value
    _data.find(e => e.id === id).favorite_count += value ? 1 : -1
    setData(_data)
  }

  return (
    <View>
      <Header searchBar iosBarStyle="light-content" style={{ backgroundColor: headerBackgroundColor }} androidStatusBarColor={androidHeaderColor}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={setSearchedText}
            onSubmitEditing={loadSearch}
          />
        </Item>
        {isLoading &&
          <Right style={{ position: 'absolute', right: 30 }} >
            <Spinner style={{ width: 10 }} color={spinnerColor} size="small" />
          </Right>
        }
      </Header>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          note
          mode="dropdown"
          style={{ width: '50%', color: 'black' }}
          selectedValue={section}
          onValueChange={onSectionChange}
        >
          <Picker.Item label="Most viral" value="hot" />
          <Picker.Item label="User submitted" value="user" />
        </Picker>
        <Picker
          note
          mode="dropdown"
          style={{ width: '50%', color: 'black' }}
          selectedValue={sort}
          onValueChange={onSortChange}
        >
          <Picker.Item label="Best" value="viral" />
          <Picker.Item label="Popular" value="top" />
          <Picker.Item label="Newest" value="time" />
        </Picker>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Gallery info={item} setFavoriteById={setFavoriteById} />}
      />
    </View>
  );
}
