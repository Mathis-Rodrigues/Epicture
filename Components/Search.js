import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, InputGroup, Button, Text, Content, Picker, Form, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { View, Image, FlatList } from 'react-native'
import { test, searchGallery } from '../API/API'
import Gallery from './Gallery'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.searchedText = ""
    this.state = {
      selected1: "key1",
      selected2: "key1",
      data: null
    };
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  searchTextInputChanged(text) {
    // console.log(text)
    this.searchedText = text
    console.log(this.searchedText)
  }
  loadSearch() {
    if (this.searchedText.length > 0) {
      console.log(this.searchedText)
      searchGallery(this.searchedText).then(rep => this.setState({ data: rep.data}))
    } else {
      test().then(rep => this.setState({ data: rep.data }))
    }
  }
  componentDidMount() {
    test().then(rep => this.setState({ data: rep.data }))
  }
  render() {
    const { data } = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Header searchBar rounded>
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
            style={{ width: 120 }}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Popular" value="key0" />
            <Picker.Item label="Random" value="key1" />
            <Picker.Item label="Newest" value="key2" />
          </Picker>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            <Picker.Item label="Popular" value="key0" />
            <Picker.Item label="Rising" value="key1" />
            <Picker.Item label="Newest" value="key2" />
          </Picker>
        </View>
        {/* <Gallery></Gallery> */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <Gallery info={item} />}
          />
        <Button onPress={() => { console.log(data)}}>
          <Text>hey</Text>
        </Button>
      </View>
    );
  }
}
