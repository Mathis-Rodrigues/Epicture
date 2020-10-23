import React, { Component, Fragment } from 'react';
import { Image, StyleSheet, View, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Input } from 'native-base';
import { Video } from 'expo-av';
import { headerBackgroundColor } from '../../config/theme'
import AsyncStorage from '@react-native-community/async-storage'

import { addToFavorite, getAvatar, getComment, addComment } from '../../API/API'
import { FlatList } from 'react-native-gesture-handler';

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

class CommentInfo extends Component {
  render() {
    const { info } = this.props
    // console.log(info)
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ color: "white" }}>{info.author + ": " + info.comment}</Text>
      </View>
    )
  }
}


export default class InfoModal extends Component {

  state = {
    isLike: false,
    accountParams: null,
    userData: null,
    commentData: null,
    userComment: ""
  }

  componentDidMount() {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      getAvatar(acc.access_token, this.props.info.account_url).then(rep => this.setState({ userData: rep.data }))
      getComment(acc.access_token, this.props.info.id).then(rep => this.setState({ commentData: rep.data }))
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

  commentTextInputChanged(text) {
    this.setState({ userComment: text })
  }

  postComment() {
    if (this.state.userComment.length > 0) {
      addComment(this.state.accountParams.access_token, this.state.userComment, this.props.info.id).then(rep => console.log(rep))
      console.log("message envoyé !")
      this.setState({ userComment: ""})
    }
  }

  render() {
    const { setModalState, info } = this.props
    const { userData, commentData } = this.state
    // console.log(info.account_url)

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
          <Text style={{ padding: 10, color: "white" }}>BEST COMMENTS:</Text>
          {commentData && commentData.map((e, i) => (
            <CommentInfo info={e} key={i} />
          ))
          }
          <Text style={{ color: 'white', alignSelf: 'center' }}>COMMENT HERE:</Text>
          {commentData &&
            <Input style={{ backgroundColor: "white", margin: 40 }}
              placeholder="Write a comment"
              onChangeText={(text) => this.commentTextInputChanged(text)}
              onSubmitEditing={() => this.postComment()}
              value={this.state.userComment}
            />
          }
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