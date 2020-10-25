import React from 'react'
import { View, Text } from 'react-native'

function AboutTab({ bio }) {
  return (
    <View style={{ padding: 20, width: '100%', height: '70%' }}>
      <Text>{bio === "" ? "No biography... Sahre something with us !" : bio}</Text>
    </View>
  )
}

export default AboutTab