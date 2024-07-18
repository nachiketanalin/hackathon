// screens/Social.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';

const POSTS_DATA = [
  { id: '1', title: 'Post 1', content: 'This is the first post.' },
  { id: '2', title: 'Post 2', content: 'This is the second post.' },
  { id: '3', title: 'Post 3', content: 'This is the third post.' },
];

const Social = () => {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openCreatePost = () => {
    setCreatePostVisible(true);
  };

  const closeCreatePost = () => {
    setCreatePostVisible(false);
  };

  const openPostDetail = (post) => {
    setSelectedPost(post);
    setPostDetailVisible(true);
  };

  const closePostDetail = () => {
    setPostDetailVisible(false);
    setSelectedPost(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPostDetail(item)}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={POSTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Button title="Create Post" onPress={openCreatePost} />
      
      {/* Create Post Modal */}
      <Modal
        visible={createPostVisible}
        animationType="slide"
        onRequestClose={closeCreatePost}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <Button title="Close" onPress={closeCreatePost} />
          </View>
          <TextInput style={styles.input} placeholder="Title" />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Content"
            multiline
          />
          <Button title="Post" onPress={closeCreatePost} />
        </View>
      </Modal>

      {/* Post Detail Modal */}
      {selectedPost && (
        <Modal
          visible={postDetailVisible}
          animationType="slide"
          onRequestClose={closePostDetail}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedPost.title}</Text>
              <Button title="Close" onPress={closePostDetail} />
            </View>
            <Text>{selectedPost.content}</Text>
            <Text style={styles.commentsTitle}>Comments:</Text>
            <FlatList
              data={COMMENTS_DATA.filter((comment) => comment.postId === selectedPost.id)}
              renderItem={({ item }) => (
                <View style={styles.comment}>
                  <Text>{item.text}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const COMMENTS_DATA = [
  { id: '1', postId: '1', text: 'Comment 1 for Post 1' },
  { id: '2', postId: '1', text: 'Comment 2 for Post 1' },
  { id: '3', postId: '2', text: 'Comment 1 for Post 2' },
  { id: '4', postId: '3', text: 'Comment 1 for Post 3' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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
});

export default Social;

