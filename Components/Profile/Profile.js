import React from 'react'
import { Text, Button } from 'react-native'

function Profile({ disconnectAccount }) {
  return (
    <Button onPress={disconnectAccount} title="Press Me">
      <Text>Disconnect</Text>
    </Button>
  )
}

export default Profile