import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Linking } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios'

const API_ENDPOINT_URL = 'https://flask-app-service-x4rxrrxcfq-ey.a.run.app'

// Dummy data (replace with data fetched from your backend)
const dummyVideos = [
  { id: '1', title: 'Dummy Video 1', videoId: 'dQw4w9WgXcQ' },
  { id: '2', title: 'Dummy Video 2', videoId: 'KMU0tzLwhbE' },
];

const dummyArticles = [
  { id: '1', title: 'Dummy Article 1', content: 'This is dummy article 1.' },
  { id: '2', title: 'Dummy Article 2', content: 'This is dummy article 2.' },
];

const Info = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  const [showArticles, setShowArticles] = useState(false); // New state for articles
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playerReady, setPlayerReady] = useState(false); // Track if the player is ready

  useEffect(() => {
    // Replace with actual API calls to fetch videos and articles
    fetchVideos();
    fetchArticles();
  }, []);

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  

  const fetchVideos = async () => {
    const response = await axios(`${API_ENDPOINT_URL}/video`);
    setVideos(response.data.response)
  };
  const fetchArticles = async () => {
    const response = await axios(`${API_ENDPOINT_URL}/text`);
    setArticles(response.data.response)
  };

  const toggleVideos = () => {
    setShowVideos(!showVideos);
    if (!showVideos) {
      setShowArticles(false);
    }
  };
  
  const toggleArticles = () => {
    setShowArticles(!showArticles);
    if (!showArticles) {
      closeVideo();
      setShowVideos(false);
    }
  };
  

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const onPlayerStateChange = (event) => {
    console.log('Player State:', event);
    if (event === 'playing') {
      setPlayerReady(true);
    } else {
      setPlayerReady(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleVideos}>
  <View style={styles.sectionHeaderContent}>
    <Text style={styles.sectionTitle}>Videos</Text>
    <Text style={styles.toggleIcon}>{showVideos ? '-' : '+'}</Text>
  </View>
</TouchableOpacity>

      {showVideos && (
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => playVideo(item.id)}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {selectedVideo && (
        <View style={styles.videoPlayer}>
          <YoutubePlayer
            height={400}
            play={true}
            videoId={selectedVideo}
            onChangeState={onPlayerStateChange}
            onError={(error) => console.error('Error:', error)}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

<TouchableOpacity style={styles.sectionHeader} onPress={toggleArticles}>
  <View style={styles.sectionHeaderContent}>
    <Text style={styles.sectionTitle}>Articles</Text>
    <Text style={styles.toggleIcon}>{showArticles ? '-' : '+'}</Text>
  </View>
</TouchableOpacity>
      {showArticles && (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Button
                key={item.id}
                title={item.title}
                onPress={() => openLink(item.url)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#001f3f', // Dark blue background
  },
  sectionHeader: {
    backgroundColor: '#0074D9', // Lighter dark blue for section headers
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8, // Rounded corners
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text for better contrast
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text for better contrast
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Add elevation for Android shadow
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#001f3f', // Dark blue text color
  },
  // videoPlayer: {
  //   backgroundColor: '#000000',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'relative',
  //   paddingVertical: 20, // Add padding to prevent overlap with close button
  // },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 10,
    borderRadius: 50, // Circular button
    elevation: 5, // Add elevation for Android shadow
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0074D9', // Lighter dark blue for text
  },
});




export default Info;