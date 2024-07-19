import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from './Header'; // Adjust the path as necessary

const { width } = Dimensions.get('window');

const videos = [
  { id: 'gKZhp2JNYyI' },
  { id: 'lql93382Hv8' },
  { id: 'sl3Dc1kERto' },
  { id: '-4J2XenZkmg' },
];

const VideoPlayer = ({ videoId, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={styles.video}
      source={{ uri: `https://img.youtube.com/vi/${videoId}/0.jpg` }}
    />
  </TouchableOpacity>
);

const FeaturedContent = ({ onVideoPress }) => {
  const renderItem = ({ item }) => (
    <View style={styles.videoItem}>
      <VideoPlayer videoId={item.id} onPress={() => onVideoPress(`https://www.youtube.com/embed/${item.id}`)} />
    </View>
  );

  return (
    <View style={styles.featuredContainer}>
      <Text style={styles.title}>Featured Articles and Videos</Text>

      <Text style={styles.subTitle}>Articles</Text>
      <View style={styles.item}>
        <Image source={require('../assets/logo.png')} style={styles.thumbnail} />
        <Text style={styles.itemTitle} onPress={() => onVideoPress('https://www.nhs.uk/conditions/dementia/living-with-dementia/')}>Article 1: What is Dementia?</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../assets/logo.png')} style={styles.thumbnail} />
        <Text style={styles.itemTitle} onPress={() => onVideoPress('https://www.nhs.uk/conditions/dementia/living-with-dementia/')}>Article 2: Caring for Someone with Dementia</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../assets/logo.png')} style={styles.thumbnail} />
        <Text style={styles.itemTitle} onPress={() => onVideoPress('https://www.nhs.uk/conditions/dementia/living-with-dementia/')}>Article 3: Dementia Symptoms and Causes</Text>
      </View>

      <Text style={styles.subTitle}>Videos</Text>
      <FlatList
        data={videos}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Info = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [contentUrl, setContentUrl] = useState('');

  const handleVideoPress = (url) => {
    setContentUrl(url);
    setModalVisible(true);
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <FeaturedContent onVideoPress={handleVideoPress} />
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <WebView source={{ uri: contentUrl }} />
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  featuredContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoItem: {
    width: width * 0.8,
    marginRight: 10,
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Info;
