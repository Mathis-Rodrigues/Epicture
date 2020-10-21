import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import ImagePicker from './ImagePicker'
import { headerBackgroundColor, postsBackgroundColor } from '../../config/theme'

function Upload() {
  return (
    <View style={styles.main}>
      <ImagePicker />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: postsBackgroundColor,
    justifyContent: 'center'
  }
})

export default Upload