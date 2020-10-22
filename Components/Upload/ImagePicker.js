import React, { Fragment, useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Video } from 'expo-av'

import FormUpload from './FormUpload'

import * as API from '../../API/API'
import { globalBlueColor } from '../../config/theme'

function ImagePicker() {
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [accountParams, setAccountParams] = useState(null)
  const [errOccured, setErrOccured] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "" })

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      !setImage(null) && !setVideo(null) && !setIsUploading(false) && !setErrOccured(false) && !setFormData({ title: "", description: "" })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      setAccountParams(acc)
    })()
  }, [])

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && result.type === "image")
      !setImage(result) && setVideo(null);
    else if (!result.cancelled && result.type === "video")
      !setVideo(result) && setImage(null);
  }

  const uploadImage = async () => {
    setIsUploading(true)
    const { title, description } = formData
    const img = await ImageManipulator.manipulateAsync(
      image.uri, [],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
    )

    console.log(title, description)
    const body = {
      image: img.base64,
      type: 'base64',
      title,
      description
    }
    const res = await API.uploadImage(accountParams.access_token, body)

    if (!res || !res.success)
      setErrOccured(true)
    setIsUploading(false)
  }

  const uploadVideo = async () => {
    // setIsUploading(true)
    // const file = new Blob([video.uri], { type: "video\/mp4" })

  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      { !image && !video &&
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>CHOOSE AN IMAGE OR A VIDEO</Text>
        </TouchableOpacity>
      }
      { image &&
        <Fragment>
          <Image source={{ uri: image.uri }} style={{ width: image.width, height: image.height, ...styles.image }} />
          <View style={{ ...styles.container, marginTop: 20 }}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>CHANGE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImage} style={styles.button} disabled={isUploading}>
              {isUploading &&
                <ActivityIndicator size="small" color="#fff" />
              }
              {!isUploading &&
                <Text style={styles.buttonText}>UPLOAD</Text>
              }
            </TouchableOpacity>
          </View>
          <FormUpload setFormData={setFormData} isUploading={isUploading} />
        </Fragment>
      }
      { video &&
        <Fragment>
          <Video
            source={{ uri: video.uri }}
            resizeMode={Video.RESIZE_MODE_COVER}
            style={{ width: video.width, height: video.height, ...styles.image }}
            shouldPlay isLooping isMuted
          />
          <View style={{ ...styles.container, marginTop: 20 }}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>CHANGE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadVideo} style={styles.button} disabled={isUploading}>
              {isUploading &&
                <ActivityIndicator size="small" color="#fff" />
              }
              {!isUploading &&
                <Text style={styles.buttonText}>UPLOAD</Text>
              }
            </TouchableOpacity>
          </View>
          <FormUpload setFormData={setFormData} isUploading={isUploading} />
        </Fragment>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  button: {
    backgroundColor: globalBlueColor,
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    width: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  image: {
    resizeMode: "contain",
    maxWidth: '90%',
    maxHeight: '30%',
    borderRadius: 10,
  },
})

export default ImagePicker