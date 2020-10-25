import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, FlatList, View, Text, Modal } from 'react-native'
import { Icon } from 'native-base'

import SortArray from './SortArray'
import { BackgroundImage, BackgroundVideo } from './BackgroundItem'
import InfoModal from '../Home/InfoModal'

import { getMyImages, getMyImageById } from '../../API/API'
import { drawerBackgroundColor } from '../../config/theme'

const Sort = [
  {
    name: 'NEWEST',
    value: true
  },
  {
    name: 'OLDEST',
    value: false
  }
]

const ImageItem = ({ token, item, last }) => {
  const [img, setImg] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const rep = await getMyImageById(token, item.id)
      setImg(rep.data)
    })()
  }, [])

  return (
    <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }}>
      { item.type !== 'video/mp4' &&
        < BackgroundImage uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      { item.type === 'video/mp4' &&
        < BackgroundVideo uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <Modal transparent visible={isModalOpen} animationType={"slide"}>
        <InfoModal setModalState={setIsModalOpen} item={item} setFavoriteById={() => { console.log("Fav") }} />
      </Modal>
    </View>
  )
}

function MyImagesTab({ token }) {
  const [images, setImages] = useState(null)
  const [sortAscending, setSortAscending] = useState(true)

  useEffect(() => {
    (async () => {
      const rep = await getMyImages(token)
      setImages(rep.data.sort((a, b) => sortAscending ? b.datetime - a.datetime : a.datetime - b.datetime))
    })()
  }, [])

  const sortImageByDate = (sortAscending) => {
    const _images = [...images]
    setImages(_images.sort((a, b) => sortAscending ? b.datetime - a.datetime : a.datetime - b.datetime))
  }

  return (
    <View style={styles.container}>
      <SortArray array={Sort} setArray={(value) => { setSortAscending(value); sortImageByDate(value) }} isSorted={sortAscending} />
      { images &&
        <FlatList
          data={images.slice(1)}
          renderItem={({ item, index }) => <ImageItem token={token} item={item} last={index === images.length - 2 && !(images.length % 2)} />}
          ListHeaderComponent={() => <ImageItem token={token} item={images[0]} last />}
          keyExtractor={image => image.id}
          numColumns={2}
          style={{ marginTop: 10 }}
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
    borderColor: 'black',
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

export default MyImagesTab