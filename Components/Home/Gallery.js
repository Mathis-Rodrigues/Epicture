import React, { Component } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';
import InfoModal from './InfoModal'

class CheckType extends Component {
  render() {
    const { info } = this.props
    if (!info.images) {
      if (info.type == "video/mp4") {
        return (<Video source={{ uri: info.link }} style={styles.video} shouldPlay isLooping isMuted={true} resizeMode={Video.RESIZE_MODE_CONTAIN} />);
      }
      else
        return (<Image source={{ uri: info.link }} style={styles.image} />);
    } else {
      // console.log(info.images[0].type)
      if (info.images[0].type == "video/mp4") {
        return (<Video source={{ uri: info.images[0].link }} style={styles.video} shouldPlay isLooping isMuted={true} resizeMode={Video.RESIZE_MODE_CONTAIN} />);
      }
      else
        return (<Image source={{ uri: info.images[0].link }} style={styles.image} />);
    }
  }
}


export default class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = { modal: false }
  }

  setModalState = (state) => {
    this.setState({ modal: state })
  }
  render() {
    const { info, setFavoriteById } = this.props

    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'column', backgroundColor: '#524947' }} onPress={() => this.setModalState(true)}>
        <Modal transparent={true} visible={this.state.modal}>
          <InfoModal setModalState={this.setModalState} info={info} setFavoriteById={setFavoriteById}/>
        </Modal>
        <Card>
          <CardItem style={{ backgroundColor: 'black' }}>
            <Left>
              <Text numberOfLines={1} style={{ color: 'white', backgroundColor: 'black' }}>{info.title}</Text>
            </Left>
          </CardItem>
          <CardItem cardBody style={{ backgroundColor: 'black' }}>
            <CheckType info={info} style={{ backgroundColor: 'black' }} />
          </CardItem>
          <CardItem style={{ height: 40, backgroundColor: 'black' }}>
            <Left>
              <Button transparent>
                <Icon active name="ios-arrow-dropup" />
                <Text>{info.ups} points</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{info.comment_count} comments</Text>
              </Button>
            </Right>
            {/* <Right>
            <Text>11h ago</Text>
          </Right> */}
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: null,
    flex: 1,
    resizeMode: 'contain'
  },
  video: {
    height: 300,
    width: '100%',
    resizeMode: 'center',
    flex: 1
  }
})