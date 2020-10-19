import React, { Component } from 'react';
import { Image , StyleSheet, View, Dimensions} from 'react-native';
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
    const { info } = this.props
    console.log(info)
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
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#524947'}}>
      <Card>
        <CardItem  style={{backgroundColor: 'black'}}>
          <Left>
              <Text numberOfLines={1} style={{color: 'white', backgroundColor: 'black'}}>{info.title}</Text>
          </Left>
        </CardItem>
        <CardItem cardBody style={{backgroundColor: 'black'}}>
          <CheckType info={info} style={{backgroundColor: 'black'}}/>
        </CardItem>
        <CardItem style={{height: 40, backgroundColor: 'black'}}>
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
      </View>
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
    height: 280,
    width: 350,
    resizeMode: 'center',
    flex: 1
  }
})