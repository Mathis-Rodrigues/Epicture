import React, { Fragment, useState } from 'react';
import { View, Text } from 'react-native'
import { Input, Card, CardItem, Left, Body } from 'native-base'

import { addComment } from '../../API/API'

function CommentInfo({ token, commentData, id, addMyComment }) {
  const [commentText, setCommentText] = useState("")

  const postComment = () => {
    console.log(commentText)
    if (commentText.length > 0) {
      addComment(token, commentText, id).then(res => console.log("lol: ", res))
      addMyComment(commentText)
      setCommentText("")
    }
  }

  if (!commentData)
    return (<Fragment />)

  return (
    <Fragment>
      { commentData.length === 0 &&
        <Text style={{ padding: 10, color: "#777", fontWeight: 'bold', alignSelf: 'center' }}>BE THE FIRST TO COMMENT</Text>
      }
      <Input
        style={{ backgroundColor: "white", marginLeft: 20, marginRight: 20 }}
        placeholder="Write a comment"
        onChangeText={setCommentText}
        onSubmitEditing={postComment}
        value={commentText}
      />
      { commentData.length > 0 && commentData.map((e, i) => (
        <View style={{ padding: 10 }} key={i}>
          <Card>
            <CardItem>
              <Left>
                <Text style={{ fontWeight: 'bold' }}>{e.author}</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Text style={{ padding: 15 }}>{e.comment}</Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      ))}
    </Fragment>
  )
}

export default CommentInfo