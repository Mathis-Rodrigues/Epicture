import React, { Fragment, useEffect, useState } from 'react'
import { Modal, TouchableOpacity, StyleSheet, FlatList, View, Text, ImageBackground } from 'react-native'
import { Icon } from 'native-base'

import InfoModal from '../Home/InfoModal'
import { BackgroundImage, BackgroundVideo } from './BackgroundItem'

import { getFavorites, getGalleryById } from '../../API/API'
import { drawerBackgroundColor } from '../../config/theme'

const FavoriteGalleryItem = ({ token, item, isModalOpen, setIsModalOpen }) => {
  const [gallery, setGallery] = useState(null)

  useEffect(() => {
    (async () => {
      const rep = await getGalleryById(token, item.id)
      setGallery(rep.data)
    })()
  }, [])

  return (gallery &&
    <Fragment>
      {gallery.images.find(e => e.id === gallery.cover).type !== 'video/mp4' &&
        < BackgroundImage uri={gallery.images.find(e => e.id === gallery.cover).link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      {gallery.images.find(e => e.id === gallery.cover).type === 'video/mp4' &&
        < BackgroundVideo uri={gallery.images.find(e => e.id === gallery.cover).link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <Modal transparent visible={isModalOpen} animationType={"slide"}>
        <InfoModal setModalState={setIsModalOpen} info={gallery} setFavoriteById={() => { console.log("Fav") }} />
      </Modal>
    </Fragment >
  )
}

const FavoriteItem = ({ token, item, last }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }}>
      { item.is_album &&
        <FavoriteGalleryItem token={token} item={item} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      }
      { !item.is_album && item.type !== 'video/mp4' &&
        < BackgroundImage uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      { !item.is_album && item.type === 'video/mp4' &&
        < BackgroundVideo uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <View style={{ ...styles.itemInfo, height: last ? 40 : 30 }}>
        <View style={styles.infoCat}>
          <Icon name="eye" style={styles.icon} />
          <Text style={styles.text}>{item.views}</Text>
        </View>
        <View style={styles.infoCat}>
          <Icon name="ios-arrow-up" style={styles.icon} />
          <Text style={styles.text}>{item.ups}</Text>
        </View>
        <View style={styles.infoCat}>
          <Icon name="ios-arrow-down" style={styles.icon} />
          <Text style={styles.text}>{item.downs}</Text>
        </View>
      </View>
      {
        !item.is_album &&
        <Modal transparent visible={isModalOpen} animationType={"slide"}>
          <InfoModal setModalState={setIsModalOpen} info={item} setFavoriteById={() => { console.log("Fav") }} />
        </Modal>
      }
    </View >
  )
}

function MyFavoritesTab({ token }) {
  const [favorites, setFavorites] = useState(null)

  useEffect(() => {
    (async () => {
      const rep = await getFavorites(token)
      setFavorites(rep.data)
    })()
  }, [])

  return (
    <View style={styles.container}>
      { favorites &&
        <FlatList
          data={favorites.slice(1)}
          renderItem={({ item, index }) => <FavoriteItem token={token} item={item} last={index === favorites.length - 2 && !(favorites.length % 2)} />}
          ListHeaderComponent={() => <FavoriteItem token={token} item={favorites[0]} last />}
          keyExtractor={favorite => favorite.id}
          numColumns={2}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    padding: 20,
  },
  itemContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: drawerBackgroundColor,
    margin: 10,
    borderRadius: 15,
  },
  itemInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333a',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoCat: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'white',
    fontSize: 17,
  },
  text: {
    color: 'white',
    fontSize: 13,
    marginLeft: 5
  }
})

export default MyFavoritesTab