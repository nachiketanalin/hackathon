import React, { useState } from 'react';
import { View, Text, Button, Modal, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PostDetailModal = ({
  visible, onClose, post, comments, onAddComment, onUpvotePost, onDownvotePost,
  onUpvoteComment, onDownvoteComment, onAddReply,
}) => {
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (newReply.trim()) {
      onAddReply(commentId, newReply);
      setNewReply('');
      setReplyingTo(null);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text>{item.text}</Text>
      <View style={styles.voteContainer}>
        <Button title="Upvote" onPress={() => onUpvoteComment(item.id)} />
        <Text>{item.upvotes}</Text>
        <Button title="Downvote" onPress={() => onDownvoteComment(item.id)} />
        <Text>{item.downvotes}</Text>
        <Button title="Reply" onPress={() => setReplyingTo(item.id)} />
      </View>
      {replyingTo === item.id && (
        <View style={styles.replyContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your reply"
            value={newReply}
            onChangeText={setNewReply}
          />
          <Button title="Add Reply" onPress={() => handleAddReply(item.id)} />
        </View>
      )}
      {item.replies && item.replies.length > 0 && (
        <FlatList
          data={item.replies}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text>{item.text}</Text>
              <View style={styles.voteContainer}>
                <Button title="Upvote" onPress={() => onUpvoteComment(item.id)} />
                <Text>{item.upvotes}</Text>
                <Button title="Downvote" onPress={() => onDownvoteComment(item.id)} />
                <Text>{item.downvotes}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{post.title}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
        <Text>{post.content}</Text>
        <Text style={styles.commentsTitle}>Comments:</Text>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Add Comment" onPress={handleAddComment} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 80
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  comment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  replyContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
});

export default PostDetailModal;