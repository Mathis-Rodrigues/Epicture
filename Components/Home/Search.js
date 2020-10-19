import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, InputGroup, Button, Text, Content, Picker, Form, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { View, Image, FlatList, StyleSheet } from 'react-native'
import { start, searchGallery, sortGallery } from '../../API/API'
import Gallery from './Gallery' 


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.searchedText = ""
    this.state = {
      section: "hot",
      sort: "viral",
      data: null
    };
  }
  onValueChange(value) {
    console.log(value)
    this.setState({
      section: value
    });
    console.log(this.state.section)
    sortGallery(value, this.state.sort).then(rep => this.setState({data: rep.data}))
    if (this.searchedText.length > 0) {
      searchGallery(this.searchedText, value).then(rep => this.setState({ data: rep.data}))
    }
  }
  onValueChange2(value) {
    this.setState({
      sort: value
    });
    sortGallery(this.state.section, value).then(rep => this.setState({data: rep.data}))
    if (this.searchedText.length > 0) {
      searchGallery(this.searchedText, value).then(rep => this.setState({ data: rep.data}))
    }
  }
  searchTextInputChanged(text) {
    // console.log(text)
    this.searchedText = text
    console.log(this.searchedText)
  }
  loadSearch() {
    if (this.searchedText.length > 0) {
      console.log(this.searchedText)
      searchGallery(this.searchedText, this.state.sort).then(rep => this.setState({ data: rep.data}))
    } else {
      sortGallery(this.state.section, this.state.sort).then(rep => this.setState({data: rep.data}))
    }
  }
  componentDidMount() {
    start().then(rep => this.setState({ data: rep.data }))
  }
  render() {
    const { data } = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Header searchBar rounded style={{ backgroundColor: '#b22a0d'}}androidStatusBarColor="#b22a0d" >
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
            style={{ width: 120,  color: 'black' }}
            selectedValue={this.state.section}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Most viral" value="hot" />
            <Picker.Item label="User submitted" value="user"/>
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
            renderItem={({item}) => <Gallery info={item} />}
          />
        {/* <Button onPress={() => { console.log(data)}}>
          <Text>hey</Text>
        </Button> */}
      </View>
    );
  }
}
