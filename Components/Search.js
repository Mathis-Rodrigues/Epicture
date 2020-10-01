import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList} from 'react-native'
import  Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable'

const dataList = [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}, {key: '6'}]

class Search extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={{height:110, backgroundColor: '#c45653', justifyContent: "center", paddingHorizontal: 10}}>
          <Animatable.View animation="slideInRight" style={{ height:50,backgroundColor: 'white', marginTop: 20, flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <Icon name="md-search" style={{ fontSize: 24}}/>
            <TextInput placeholder= "Search" style={{fontSize: 14, marginLeft: 15, width: 500}}/>
          </Animatable.View>
        </View>
        <FlatList>
          
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    textinput: {
      marginTop: 40,
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    }
  })

export default Search