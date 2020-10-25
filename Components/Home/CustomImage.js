import React from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
import { Video } from 'expo-av'

function CustomImage({ item }) {
  const width = useWindowDimensions().width
  const ratio = item.height / item.width

  if (item.type === "video/mp4")
    return (<Video source={{ uri: item.link }} style={styles.video} shouldPlay isLooping isMuted resizeMode={Video.RESIZE_MODE_CONTAIN} />);
  return (
    <Image
      source={{ uri: item.link }}
      style={{
        width: item.width > width ? width : item.width,
        height: item.width > width ? width * ratio : item.height
      }}
    />)
}

const styles = StyleSheet.create({
  video: {
    height: 400,
    width: '100%',
    resizeMode: 'center',
    flex: 1
  }
})

export default CustomImage