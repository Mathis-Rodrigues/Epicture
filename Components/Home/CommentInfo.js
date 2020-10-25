import React, { Fragment, useState } from 'react';
import { View, Text } from 'react-native'
import { Input } from 'native-base'

import { addComment } from '../../API/API'

function CommentInfo({ token, commentData, id }) {
  const [commentText, setCommentText] = useState("")

  const postComment = () => {
    if (userComment.length > 0) {
      addComment(token, commentText, id)
      setCommentText("")
    }
  }

  if (!commentData)
    return (<Fragment />)

  if (!commentData.length)
    return <Text style={{ padding: 10, color: "white" }}>NO COMMENT AVAILABLE</Text>

  return (
    <Fragment>
      <Text style={{ padding: 10, color: "white" }}>BEST COMMENTS:</Text>
      {commentData.map((e, i) => (
        <View style={{ padding: 10 }} key={i}>
          <Text style={{ color: "white" }}>{e.author + ": " + e.comment}</Text>
        </View>
      ))
      }
      <Text style={{ color: 'white', alignSelf: 'center' }}>COMMENT HERE:</Text>
      <Input style={{ backgroundColor: "white", margin: 40 }}
        placeholder="Write a comment"
        onChangeText={setCommentText}
        onSubmitEditing={postComment}
        value={commentText}
      />
    </Fragment>
  )
}

export default CommentInfo