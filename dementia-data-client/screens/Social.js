import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CreatePostModal from './CreatePostModal';
import PostDetailModal from './PostDetailModal';

// Dummy data for posts and comments (replace with data fetched from backend)
const POSTS_DATA = [
  { id: '1', title: 'Post 1', content: 'This is the first post.', upvotes: 0, downvotes: 0 },
  { id: '2', title: 'Post 2', content: 'This is the second post.', upvotes: 0, downvotes: 0 },
  { id: '3', title: 'Post 3', content: 'This is the third post.', upvotes: 0, downvotes: 0 },
];

const COMMENTS_DATA = [
  { id: '1', postId: '1', text: 'Comment 1 for Post 1', upvotes: 0, downvotes: 0, replies: [] },
  { id: '2', postId: '1', text: 'Comment 2 for Post 1', upvotes: 0, downvotes: 0, replies: [] },
  { id: '3', postId: '2', text: 'Comment 1 for Post 2', upvotes: 0, downvotes: 0, replies: [] },
  { id: '4', postId: '3', text: 'Comment 1 for Post 3', upvotes: 0, downvotes: 0, replies: [] },
];

const Social = () => {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(POSTS_DATA);
  const [comments, setComments] = useState(COMMENTS_DATA);

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

  const handleAddComment = (newComment) => {
    const commentId = (comments.length + 1).toString();
    const newCommentObj = { id: commentId, postId: selectedPost.id, text: newComment, upvotes: 0, downvotes: 0, replies: [] };
    setComments([...comments, newCommentObj]);
  };

  const handleAddReply = (commentId, newReply) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { id: `${commentId}-${comment.replies.length + 1}`, text: newReply, upvotes: 0, downvotes: 0 },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleUpvotePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDownvotePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleUpvoteComment = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, upvotes: comment.upvotes + 1 } : comment
    );
    setComments(updatedComments);
  };

  const handleDownvoteComment = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, downvotes: comment.downvotes + 1 } : comment
    );
    setComments(updatedComments);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPostDetail(item)}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.content}</Text>
        <View style={styles.voteContainer}>
          <Button title="Upvote" onPress={() => handleUpvotePost(item.id)} />
          <Text>{item.upvotes}</Text>
          <Button title="Downvote" onPress={() => handleDownvotePost(item.id)} />
          <Text>{item.downvotes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Button title="Create Post" onPress={openCreatePost} />

      <CreatePostModal visible={createPostVisible} onClose={closeCreatePost} />

      {selectedPost && (
        <PostDetailModal
          visible={postDetailVisible}
          onClose={closePostDetail}
          post={selectedPost}
          comments={comments.filter((comment) => comment.postId === selectedPost.id)}
          onAddComment={handleAddComment}
          onUpvotePost={handleUpvotePost}
          onDownvotePost={handleDownvotePost}
          onUpvoteComment={handleUpvoteComment}
          onDownvoteComment={handleDownvoteComment}
          onAddReply={handleAddReply}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  post: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Social;
