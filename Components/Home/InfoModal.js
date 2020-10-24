import React, { Component } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Icon, Input } from 'native-base'
import { Video } from 'expo-av'
import AsyncStorage from '@react-native-community/async-storage'

import CommentInfo from './CommentInfo'

import { addAlbumToFavorite, getAvatar, getComment, addComment } from '../../API/API'

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
    userData: null,
    commentData: null
  }

  componentDidMount() {
    const { info } = this.props;
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      getAvatar(acc.access_token, info.account_url === "" ? "me" : info.account_url).then(rep => this.setState({ userData: rep.data }))
      getComment(acc.access_token, info.id).then(rep => this.setState({
        commentData: rep.status === 400 ? {} : rep.data
      }))
      this.setState({ accountParams: acc })
    })()
    this.setState({ isLike: info.favorite })
  }

  isFavorite = () => {
    const { info, setFavoriteById } = this.props
    const { accountParams, isLike } = this.state

    addAlbumToFavorite(accountParams.access_token, info.id)
    setFavoriteById(info.id, !isLike)
    this.setState({ isLike: !isLike })
  }

  commentTextInputChanged = (text) => {
    this.setState({ userComment: text })
  }

  render() {
    const { setModalState, info } = this.props
    const { accountParams, commentData, userData } = this.state

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
            <Text style={{ flex: 1, color: 'white', padding: 10 }} numberOfLines={2}>{info.title}</Text>
          </View>
          <Text style={{ marginBottom: 10, color: "grey", fontWeight: "bold" }}>from: {info.account_url}</Text>
        </View>
        <ScrollView>
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
          <CommentInfo token={accountParams ? accountParams.access_token : ""} commentData={commentData} id={info.id} />
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