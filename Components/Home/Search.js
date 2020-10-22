import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text, Picker } from 'native-base';
import { View, FlatList, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Gallery from './Gallery'

import { start, searchGallery, sortGallery} from '../../API/API'
import { headerBackgroundColor } from '../../config/theme'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.searchedText = ""
    this.state = {
      section: "top",
      sort: "viral",
      data: null,
      accountParams: null
    };
  }
  // const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     !setImage(null) && !setVideo(null) && !setIsUploading(false) && !setErrOccured(false) && !setFormData({ title: "", description: "" })
  //   })
  //   return unsubscribe
  // }, [navigation])

  onValueChange(value) {
    const { sort, accountParams } = this.state

    sortGallery(accountParams.access_token, value, sort).then(rep => this.setState({ data: rep.data }))
    if (this.searchedText.length > 0) {
      searchGallery(accountParams.access_token, this.searchedText, value).then(rep => this.setState({ data: rep.data }))
    }
    this.setState({ section: value });
  }

  onValueChange2(value) {
    const { section, accountParams } = this.state

    sortGallery(accountParams.access_token, section, value).then(rep => this.setState({ data: rep.data }))
    if (this.searchedText.length > 0) {
      searchGallery(accountParams.access_token, this.searchedText, value).then(rep => this.setState({ data: rep.data }))
    }
    this.setState({ sort: value });
  }

  searchTextInputChanged(text) {
    // console.log(text)
    this.searchedText = text
    console.log(this.searchedText)
  }

  loadSearch() {
    const { sort, section, accountParams } = this.state

    if (this.searchedText.length > 0) {
      console.log(this.searchedText)
      searchGallery(accountParams.access_token, this.searchedText, sort).then(rep => this.setState({ data: rep.data }))
    } else {
      sortGallery(accountParams.access_token, section, sort).then(rep => this.setState({ data: rep.data }))
    }
  }

  setFavoriteById = (id, value) => {
    const { data } = this.state

    data.find(e => e.id === id).favorite = value
    this.setState({ data })
  }

  componentDidMount() {
    ( async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      start(acc.access_token).then(rep => this.setState({ data: rep.data }))
      this.setState({ accountParams: acc })
    })()
  }

  render() {
    const { data } = this.state

    return (
      <View>
        <Header searchBar style={{ backgroundColor: headerBackgroundColor }} androidStatusBarColor={headerBackgroundColor} >
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => this.searchTextInputChanged(text)}
              onSubmitEditing={() => this.loadSearch()}
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
            selectedValue={this.state.section}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Most viral" value="top" />
            <Picker.Item label="User submitted" value="user" />
          </Picker>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120, color: 'black' }}
            selectedValue={this.state.sort}
            onValueChange={this.onValueChange2.bind(this)}
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
          renderItem={({ item }) => <Gallery info={item} setFavoriteById={this.setFavoriteById}/>}
        />
        {/* <Button onPress={() => { console.log(data)}}>
          <Text>hey</Text>
        </Button> */}
      </View>
    );
  }
}
