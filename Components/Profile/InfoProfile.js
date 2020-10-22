import React, { useEffect, useState } from 'react'
import { ImageBackground, View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Icon, Body, Header, Left, Right, Subtitle, Title, Button } from 'native-base'

function InfoProfile({ data }) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data.cover }} style={styles.imageBackground}>
        <Header transparent androidStatusBarColor="transparent">
          <Left style={{ marginTop: 100, marginLeft: 20 }}>
            <Image source={{ uri: data.avatar }} style={styles.pp} />
          </Left>
          <Body style={{ marginTop: 100, marginLeft: 70 }}>
            <Title style={{ fontWeight: 'bold', fontSize: 24, width: '200%' }}>
              {data.url}
            </Title>
            <Subtitle style={{ fontWeight: 'bold', fontSize: 14 }}>
              {data.reputation}
              {"   •   "}
              {data.reputation_name}
            </Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={navigation.openDrawer}>
              <Icon name='menu' style={{ fontSize: 33 }} />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    position: 'relative',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  pp: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 1000,
    // marginTop: 100,
    // marginLeft: 20,
  }
})

export default InfoProfile