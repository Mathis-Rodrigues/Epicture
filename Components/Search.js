import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, InputGroup, Button, Text, Content, Picker, Form, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { View, Image, FlatList } from 'react-native'
import { test } from '../API/API'
import Gallery from './Gallery'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      data: null
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentDidMount() {
    test().then(data => this.setState({ data: data.data }))
  }
  render() {
    const { data } = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
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
            selectedValue={this.state.selected}
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
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
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
        <Button onPress={() => { console.log(data) }}>
          <Text>hey</Text>
        </Button>
      </View>
    );
  }
}
