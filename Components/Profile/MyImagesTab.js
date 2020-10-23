import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, StyleSheet, FlatList, View, Text, Image, ImageBackground } from 'react-native'

import SortArray from './SortArray'

import { getMyImages, getMyImageById } from '../../API/API'
import {
  drawerBackgroundColor,
  globalBlueColor,
  drawerReverseTextColor,
  drawerTextColor
} from '../../config/theme'

const Sort = [
  {
    name: 'NEWEST',
    value: false
  },
  {
    name: 'OLDEST',
    value: true
  }
]

const ImageItem = ({ item, last }) => {
  return (
    <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }}>
      <ImageBackground
        source={{ uri: item.link }}
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ borderRadius: 15 }}
      />
    </View>
  )
}

function MyImagesTab({ token }) {
  const [images, setImages] = useState(null)
  const [sortAscending, setSortAscending] = useState(false)
  const flatList = useRef(null)

  useEffect(() => {
    (async () => {
      const rep = await getMyImages(token)
      setImages(rep.data.sort((a, b) => sortAscending ? a.datetime - b.datetime : b.datetime - a.datetime))
      // flatList.current.scrollToEnd({ animated: false })
    })()
  }, [])

  const sortImageByDate = (sortAscending) => {
    const _images = [...images]
    setImages(_images.sort((a, b) => sortAscending ? a.datetime - b.datetime : b.datetime - a.datetime))
  }

  return (
    <View style={styles.container}>
      <SortArray array={Sort} setArray={(value) => { setSortAscending(value); sortImageByDate(value) }} isSorted={sortAscending} />
      { images &&
        <FlatList
          ref={flatList}
          data={images}
          renderItem={({ item, index }) => <ImageItem item={item} last={index === images.length - 1} />}
          keyExtractor={image => image.id}
          numColumns={2}
          inverted
          style={{ marginBottom: 200, marginTop: 10 }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  itemContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: drawerBackgroundColor,
    margin: 10,
    borderRadius: 15,
    borderColor: 'black',
  }
})

export default MyImagesTab