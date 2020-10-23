import React, { Component, Fragment } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';
import { headerBackgroundColor } from '../../config/theme'
import AsyncStorage from '@react-native-community/async-storage'

import { addToFavorite, getAvatar } from '../../API/API'
import { createPortal } from 'react-dom';

function CustomImage({ info }) {
  const uri = !info.images ? info.link : info.images[0].link
  const type = !info.images ? info.type : info.images[0].type

  if (type === "video/mp4")
    return (<Video source={{ uri }} style={styles.video} shouldPlay isLooping isMuted={true} resizeMode={Video.RESIZE_MODE_CONTAIN} />);
  return (<Image source={{ uri }} style={styles.image} />);
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
    isLike: false,
    accountParams: null,
    userData: null
  }

  componentDidMount() {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      getAvatar(acc.access_token, this.props.info.account_url).then(rep => this.setState({ userData: rep.data }))
      this.setState({ accountParams: acc })
    })()
    // if (this.props.favorite == true)
    //   this.setState({ isLike: true})
    // else
    //   this 
    this.props.info.favorite ? this.setState({ isLike: true }) : this.setState({ isLike: false })
    // getAvatar(this.state.accountParams.access_token, this.props.info.account_url).then(rep => this.setState({ userData: rep.data }))
  }

  isFavorite = () => {
    const { isLike } = this.state
    addToFavorite(this.state.accountParams.access_token, this.props.info.id)
    this.props.setFavoriteById(this.props.info.id, !isLike)
    isLike ? this.setState({ isLike: false }) : this.setState({ isLike: true })
  }

  render() {
    const { setModalState, info } = this.props
    const { userData } = this.state
    console.log(info)

    return (
      <View style={{ backgroundColor: "#222", flex: 1, flexDirection: 'column' }}>
        <View style={{ alignItems: "center" }} >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setModalState(false)}>
              <Icon active name="ios-close" style={{ fontSize: 60, color: 'white', marginLeft: 20 }} />
            </TouchableOpacity>
            {userData &&
              <Image style={{ height: 40, width: 40, resizeMode: "contain", borderRadius: 1000, marginLeft: 20 }} source={{ uri: userData.avatar }} />
            }
            <Text style={{ flex: 1, color: 'white', marginLeft: 10 }} numberOfLines={2}>{info.title}</Text>
          </View>
          <Text style={{ marginBottom: 10, color: "grey", fontWeight: "bold" }}>from: {info.account_url}</Text>
        </View>
        <CustomImage info={info} />
        <Text style={{ color: "grey", padding: 10 }}>{info.views} views</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.isFavorite}>
              <Icon active name={(this.state.isLike ? "md-heart" : "md-heart-empty")} style={{ color: 'red', fontSize: 30 }} />
            </TouchableOpacity>
            <Text style={{ color: 'white', marginLeft: 10 }}>{info.favorite_count}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => console.log("xd")}>
              <Icon active name="ios-arrow-up" style={{ color: 'cyan', fontSize: 30 }} />
            </TouchableOpacity>
            <Text style={{ color: 'white', marginLeft: 10, marginRight: 10 }}>{info.ups - info.downs}</Text>
            <TouchableOpacity onPress={() => console.log("xd")}>
              <Icon active name="ios-arrow-down" style={{ color: 'cyan', fontSize: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginRight: 10 }}>{info.comment_count}</Text>
            <TouchableOpacity onPress={() => console.log("xd")}>
              <Icon active name="chatbubbles" style={{ color: 'cyan', fontSize: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        <GetDescription info={info} />
        <ScrollView>
        </ScrollView>
      </View>
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
    height: 400,
    width: '100%',
    resizeMode: 'center',
    flex: 1
  },
  description: {
    color: 'white',
    padding: 10
  }
})