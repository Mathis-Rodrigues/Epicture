import React, { Fragment, useEffect, useState } from 'react'
import { View, Button, Platform, Image } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import AsyncStorage from '@react-native-community/async-storage'

import * as API from '../../API/API'

function ImagePicker() {
  const [image, setImage] = useState(null)
  const [accountParams, setAccountParams] = useState(null)
  const [errOccured, setErrOccured] = useState(false)

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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  }

  const uploadImage = async () => {
    const img = await ImageManipulator.manipulateAsync(
      image.uri, [],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
    )
    const body = {
      image: img.base64,
      type: 'base64'
    }
    const res = await API.uploadImage(accountParams.access_token, body)

    if (!res || !res.success)
      setErrOccured(true)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      { image &&
        <Fragment>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <Button title="Upload" onPress={uploadImage} />
        </Fragment>
      }
    </View>
  )
}

export default ImagePicker