import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';

class CheckType extends Component {
  render() {
    const { info } = this.props
    if (!info.images) {
      if (info.type == "video/mp4") {
        return (<Video source={{ uri: info.link }} style={{ height: 200, width: null, flex: 1 }} shouldPlay isLooping isMuted={true} />);
      }
      else
      return (<Image source={{ uri: info.link }} style={{ height: 200, width: null, flex: 1 }} />);
    } else {
      // console.log(info.images[0].type)
      if (info.images[0].type == "video/mp4") {
        return (<Video source={{ uri: info.images[0].link }} style={{ height: 200, width: null, flex: 1 }} shouldPlay isLooping isMuted={true} />);
      }
      else
      return (<Image source={{ uri: info.images[0].link }} style={{ height: 200, width: null, flex: 1 }} />);
    }
  }
}


export default class Gallery extends Component {

  render() {
    const { info } = this.props
    // console.log(info.type)
    // if (info.type == "image/gif" || info.type == "image/png") {
    //   console.log("c pas une video " + info.link)
    // } else {
    //   console.log("c une video " + info.images[0].link)
    // }
    //   console.log("c est une image")
    //   console.log(info.link)
    // }
    // else {
    //   console.log("video !!!")
    //   console.log(info.link)
    // }
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: 'Image URL' }} />
            <Body>
              <Text>{info.title}</Text>
              <Text note>GeekyAnts</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <CheckType info={info} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}