import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';

const CreatePostModal = ({ visible, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Handle the logic to create a new post
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Create New Post</Text>
          <Button title="Close" onPress={onClose} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="Post" onPress={handlePost} />
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
});

export default CreatePostModal;
