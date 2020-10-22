import React, { Component } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';
import { headerBackgroundColor } from '../../config/theme'
import AsyncStorage from '@react-native-community/async-storage'

import { addToFavorite } from '../../API/API'
import { createPortal } from 'react-dom';

class CheckType extends Component {
  render() {
    const { info } = this.props
    if (!info.images) {
      if (info.type == "video/mp4") {
        return (<Video source={{ uri: info.link }} style={styles.video} shouldPlay isLooping isMuted={true} />);
      }
      else
        return (<Image source={{ uri: info.link }} style={styles.image} />);
    } else {
      // console.log(info.images[0].type)
      if (info.images[0].type == "video/mp4") {
        return (<Video source={{ uri: info.images[0].link }} style={styles.video} shouldPlay isLooping isMuted={true} />);
      }
      else
        return (<Image source={{ uri: info.images[0].link }} style={styles.image} />);
    }
  }
}

class GetDescription extends Component {
  render() {
    const { info } = this.props
    if (!info.images) {
      if (info.description == null)
        return (<Text style={styles.description}>No description</Text>)
      else
        return (<Text style={styles.description}>{info.description}</Text>)
    }
    else {
      if (info.images[0].description == null)
        return (<Text style={styles.description}>No description</Text>)
      else
        return (<Text style={styles.description}>{info.images[0].description}</Text>)

    }
  }
}


export default class InfoModal extends Component {
  state = {
    isLike: "md-heart-empty",
    accountParams: null,
    ID: null
  }
  componentDidMount() {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      this.setState({ accountParams: acc })
    })()
    if (!this.props.info.images)
      this.setState({ ID: this.props.info.id })
    else
      this.setState({ ID: this.props.info.images[0].id })
    console.log(this.state.ID)
  }
  isFavorite() {
    if (this.state.isLike == "md-heart-empty") {
      this.setState({ isLike: "md-heart" })
      // console.log(this.props.info.id)
      // console.log(this.state.accountParams.access_token)
      console.log(this.state.ID)
      addToFavorite(this.state.accountParams.access_token, this.state.ID)
    }
    else
      this.setState({ isLike: "md-heart-empty" })
  }
  render() {
    const { setModalState, info } = this.props
    // console.log(info)
    return (
      <Container style={{ backgroundColor: "#222", flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 75, backgroundColor: '#222', flexDirection: 'row' }} >
          <Button transparent onPress={() => setModalState(false)}>
            <Icon active name="ios-close" style={{ fontSize: 60, color: 'white' }} />
          </Button>
          <Text style={{ color: 'white', marginRight: 80, marginTop: 2 }} numberOfLines={2}>{info.title}</Text>

        </View>
        {/* <Button onPress={() => console.log(info)}>
          <Text>quit</Text>
        </Button> */}
        {/* <ScrollView> */}
        {/* <CheckType info={info} style={{ backgroundColor: 'black' }} /> */}
        <ScrollView>
          <View>
            <CheckType info={info} />
            {/* <Image source={{ uri: "https://i.imgur.com/9U9C3Cy.jpg"}} style={styles.image} /> */}
            <View style={{ flex: 1, flexDirection: 'row', height: 30, marginTop: 15 }}>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.isFavorite()}>
                <Icon active name={this.state.isLike} style={{ color: 'red', fontSize: 30 }} />
              </TouchableOpacity >
              <Text style={{ color: 'white', marginLeft: 10, marginTop: 3 }}>{info.favorite_count}</Text>
            </View>
            <GetDescription info={info} />
          </View>
        </ScrollView>
        {/* </ScrollView> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: null,
    resizeMode: 'cover'
  },
  video: {
    height: 280,
    width: 350,
    resizeMode: 'contain',
  },
  description: {
    color: 'white',
    padding: 10
  }
})