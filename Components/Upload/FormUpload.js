import React, { Fragment, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import { inputBorderColor, uploadFormTextColor, uploadFormPlaceholderColor } from '../../config/theme'

function FormUpload({ isUploading, setFormData }) {
  const [titleInputValue, setTitleInputValue] = useState("")
  const [descInputValue, setDescInputValue] = useState("")
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const setTitle = (value) => {
    setTitleInputValue(value)
    setFormData(prev => ({ ...prev, title: value }))
  }

  const setDescription = (value) => {
    setDescInputValue(value)
    setFormData(prev => ({ ...prev, description: value }))
  }

  const setIsAlbum = (value) => {
    setToggleCheckBox(value)
    setFormData(prev => ({ ...prev, isAlbum: value }))
  }

  return (
    <Fragment>
      <View style={{ ...styles.container, justifyContent: "flex-start", marginTop: 40 }}>
        <Text style={styles.formText}>
          {toggleCheckBox ? "Album title:" : "Title:"}
        </Text>
        <TextInput
          style={{ ...styles.titleInput, width: toggleCheckBox ? '70%' : '80%' }}
          value={titleInputValue}
          onChangeText={setTitle}
          placeholder="A beautiful title for your pic"
          placeholderTextColor={uploadFormPlaceholderColor}
          editable={!isUploading}
        />
      </View>
      <View style={{ justifyContent: "flex-start", marginTop: 40, width: '80%' }}>
        <Text style={styles.formText}>
          {toggleCheckBox ? "Album description:" : "Description:"}
        </Text>
        <TextInput
          style={styles.descInput}
          value={descInputValue}
          onChangeText={setDescription}
          multiline
          editable={!isUploading}
        />
      </View>
      <View style={{ marginTop: 40, width: '80%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          disabled={isUploading}
          value={toggleCheckBox}
          onValueChange={(newValue) => setIsAlbum(newValue)}
        />
        <Text style={styles.formText}>
          Upload as an album (public post)
        </Text>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  formText: {
    color: uploadFormTextColor,
    fontSize: 14,
    fontWeight: '700'
  },
  titleInput: {
    marginLeft: 10,
    color: uploadFormTextColor,
    height: 30,
    borderRadius: 4,
    borderColor: inputBorderColor,
    borderWidth: 1,
    padding: 6,
    paddingLeft: 10,
  },
  descInput: {
    marginTop: 10,
    width: '100%',
    height: 150,
    color: uploadFormTextColor,
    borderRadius: 4,
    borderColor: inputBorderColor,
    borderWidth: 1,
    padding: 15,
  }
})

export default FormUpload