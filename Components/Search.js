import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList} from 'react-native'
import  Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable'
import { test } from '../API/API'


const dataList = [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}, {key: '6'}]

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

class Search extends React.Component {
  renderItem = ({ item }) => (
    <Item title={item.title} />
  )
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:110, backgroundColor: '#c45653', justifyContent: "center", paddingHorizontal: 10}}>
          <Animatable.View animation="slideInRight" style={{ height:50,backgroundColor: 'white', marginTop: 20, flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <Icon name="md-search" style={{ fontSize: 24}}/>
            <TextInput placeholder= "Search" style={{fontSize: 14, marginLeft: 15, width: 500}}/>
          </Animatable.View>
        </View>
        <Button title='test' onPress={() => {test()}}/>
      {/* <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  }
})

// const styles = StyleSheet.create({
//     main_container: {
//       flex: 1
//     },
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent:'center',
//     },
//     item: {
//       backgroundColor: '#3232ff',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: 100,
//       flex: 1
//     },
//     itemText: {
//         fontSize: 50
//     }
//   })

export default Search