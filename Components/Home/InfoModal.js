import React, { Component } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';

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

export default class Gallery extends Component {

  render() {
    const { setModalState, info } = this.props
    return (
      <View style={{ backgroundColor: "#524947", flex: 1, flexDirection: 'column' }}>
        <Button onPress={() => setModalState(false)}>
          <Text>quit</Text>
        </Button>
        {/* <Button onPress={() => console.log(info)}>
          <Text>quit</Text>
        </Button> */}
        <CheckType info={info} style={{ backgroundColor: 'black' }} />
        <Button transparent>
          <Icon active name="ios-arrow-dropup" />
          <Text>{info.ups} points</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: null,
    resizeMode: 'contain'
  },
  video: {
    height: 280,
    width: 350,
    resizeMode: 'center',
  }
})