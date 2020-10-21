import React, { Component } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';
import { headerBackgroundColor } from '../../config/theme'

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
    if (!info.images)
      return (<Text style={{ color: 'white'}}>No description</Text>)
    else
      return (<Text style={{ color: 'white'}}>{info.images[0].description}</Text>)
  }
}

export default class InfoModal extends Component {
  render() {
    const { setModalState, info } = this.props
    console.log(info)
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
            <Text style={{ color: 'white' }}>{info.description}</Text>
            {/* <Image source={{ uri: "https://i.imgur.com/9U9C3Cy.jpg"}} style={styles.image} /> */}
            <Button transparent>
              <Icon active name="md-heart-empty" style={{ color: 'red' }} />
            </Button>
              <GetDescription info={info}/>
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
  }
})