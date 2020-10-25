import React, { Component, Fragment, useEffect, useState } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Icon } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import CommentInfo from './CommentInfo'
import ImageCarousel from './ImageCarousel'
import CustomImage from './CustomImage'

import {
  addAlbumToFavorite,
  addImageToFavorite,
  getAvatar,
  getComment
} from '../../API/API'
import {
  globalBlueColor,
  homeBackgroundColor,
  lightTitleTextColor,
  spinnerColor,
  titleTextColor
} from '../../config/theme'

const PublicContent = ({ item, accountParams, isFavorite, isLike, addComment, commentData }) => (
  <Fragment>
    <Text style={{ color: lightTitleTextColor, padding: 10 }}>{item.views} views</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={isFavorite}>
          <Icon name={isLike ? "md-heart" : "md-heart-empty"} style={{ color: '#e33', fontSize: 30 }} />
        </TouchableOpacity>
        <Text style={{ color: titleTextColor, fontWeight: 'bold', marginLeft: 10 }}>{item.favorite_count}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => console.log("xd")}>
          <Icon name="ios-arrow-dropup" style={{ color: globalBlueColor, fontSize: 30 }} />
        </TouchableOpacity>
        <Text style={{ color: titleTextColor, fontWeight: 'bold', marginLeft: 10, marginRight: 10 }}>{item.ups - item.downs}</Text>
        <TouchableOpacity onPress={() => console.log("xd")}>
          <Icon name="ios-arrow-dropdown" style={{ color: globalBlueColor, fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: titleTextColor, fontWeight: 'bold', marginRight: 10 }}>{item.comment_count}</Text>
        <TouchableOpacity onPress={() => console.log("xd")}>
          <Icon name="chatbubbles" style={{ color: globalBlueColor, fontSize: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.description}>{item.description}</Text>
    <CommentInfo token={accountParams ? accountParams.access_token : ""} commentData={commentData} id={item.id} addMyComment={addComment} />
  </Fragment>
)

export default function InfoModal({ item, setFavoriteById, setModalState }) {
  const [isLike, setIsLike] = useState(item.favorite)
  const [accountParams, setAccountParams] = useState(null)
  const [userData, setUserData] = useState(null)
  const [commentData, setCommentData] = useState(null)
  const [isVote, setIsVote] = useState(item.vote)

  useEffect(() => {
    console.log(item);
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      setAccountParams(acc)
      const rep = await getAvatar(acc.access_token, item.account_url)
      setUserData(rep.data)
      const rep2 = await getComment(acc.access_token, item.id)
      setCommentData(rep2.status === 400 ? [] : rep2.data)
    })()
    console.log(item)
  }, [])

  const isFavorite = () => {
    if (item.is_album)
      addAlbumToFavorite(accountParams.access_token, item.id)
    else
      addImageToFavorite(accountParams.access_token, item.id)
    setFavoriteById(item.id, !isLike)
    setIsLike(!isLike)
  }

  const addComment = (msg) => {
    const _commentData = [...commentData]
    _commentData.push({
      comment: msg,
      author: accountParams.account_username,
    })
    setCommentData(_commentData)
  }

  return (
    <View style={{ flex: 1, backgroundColor: homeBackgroundColor }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setModalState(false)}>
          <Icon active name="ios-close" style={{ fontSize: 60, color: spinnerColor, marginLeft: 20 }} />
        </TouchableOpacity>
        {userData &&
          <Image style={{ height: 40, width: 40, resizeMode: "contain", borderRadius: 40, marginLeft: 20 }} source={{ uri: userData.avatar + `&nocache=${userData.avatar_name}` }} />
        }
        <Text style={styles.title} numberOfLines={2}>{!item.title ? item.title : ""}</Text>
      </View>
      <Text style={styles.subtitle}>from: {item.account_url}</Text>
      <ScrollView>
        <ImageCarousel itemArray={item.is_album ? item.images : [item]} />
        { item.in_gallery &&
          <PublicContent item={item} accountParams={accountParams} isFavorite={isFavorite} isLike={isLike} commentData={commentData} addComment={addComment} />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    flex: 1,
    color: titleTextColor,
    padding: 10
  },
  subtitle: {
    alignSelf: 'center',
    color: lightTitleTextColor,
    fontWeight: "bold",
    fontSize: 14
  },
  description: {
    color: 'black',
    padding: 10
  },
  vote: {
    color: globalBlueColor,
    fontSize: 30
  },
  upvote: {
    color: 'green',
    fontSize: 30
  },
  downvote: {
    color: 'red',
    fontSize: 30
  }
})