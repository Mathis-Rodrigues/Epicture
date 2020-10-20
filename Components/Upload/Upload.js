import React from 'react'
import { usePermissions, CAMERA, CAMERA_ROLL } from 'expo-permissions'
import { View, Camera, Text, Button } from 'react-native'

function Upload() {
  const [permission, askForPermission] = usePermissions([CAMERA, CAMERA_ROLL], { ask: true });

  if (!permission || permission.status !== 'granted') {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }

  return (
    <View>
      <Text>Permission is granted</Text>
  </View>
)
}

export default Upload