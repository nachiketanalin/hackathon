import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playerReady, setPlayerReady] = useState(false); // Track if the player is ready

  useEffect(() => {
    // Replace with actual API calls to fetch videos and articles
    setVideos(dummyVideos);
    setArticles(dummyArticles);
  }, []);

  const toggleVideos = () => {
    setShowVideos(!showVideos);
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
        <Text style={styles.sectionTitle}>Videos</Text>
      </TouchableOpacity>
      {showVideos && (
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => playVideo(item.videoId)}>
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
            <Text style={styles.closeButtonText}>Close Video</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.sectionHeader} onPress={toggleVideos}>
        <Text style={styles.sectionTitle}>Articles</Text>
      </TouchableOpacity>
      {!showVideos && (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text>{item.content}</Text>
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
    backgroundColor: '#f0f0f0',
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // videoPlayer: {
  //   backgroundColor: '#000000',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'relative',
  //   paddingBottom: 10, // Add padding to prevent overlap with close button
  // },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Info;






// const Info = () => {
//   const [videos, setVideos] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [showVideos, setShowVideos] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [expandedSection, setExpandedSection] = useState(null);

//   useEffect(()=>{
//     fetchData();
//   }, []);

//   const fetchData = async() => {
//     try {
//       const v_response = await axios.get('http://127.0.0.1:5000/video');
//       // const v_data = await v_response.json();
//       // console.log(v_data.response);
//       // console.log(v_response.data.response);
//       // setVideos(v_response.data.response);
//       setVideos(dummyVideos);
//       // const a_response = await fetch('http://127.0.0.1:5000/text');
//       // const a_data = await a_response.json();
//       const a_response = await axios.get('http://127.0.0.1:5000/text');
//       setArticles(a_response.data.response);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   }

//   const toggleSection = (section) => {
//     if (expandedSection === section) {
//       setExpandedSection(null);
//     } else {
//       setExpandedSection(section);
//     }
//   };

//   const openLink = (url) => {
//     Linking.openURL(url);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => toggleSection('videos')}>
//         <Text style={styles.sectionTitle}>Videos</Text>
//       </TouchableOpacity>
//       {expandedSection === 'videos' && (
//         <View>
//           {videos.map((video, index) => (
//             <YoutubePlayer 
//               key={index}
//               height={300}
//               play={false}
//               videoId={video.videoId}
//             />
//           ))}
//         </View>
//       )}

//       <TouchableOpacity onPress={() => toggleSection('articles')}>
//         <Text style={styles.sectionTitle}>Articles</Text>
//       </TouchableOpacity>
//       {expandedSection === 'articles' && (
//         <View>
//         {articles.map((article, index) => (
//           <TouchableOpacity
//             key={`video_${index}`}
//             style={styles.itemContainer}
//             onPress={() => openLink(article)}
//           >
//             <Text style={styles.itemTitle}>{article}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   itemContainer: {
//     marginBottom: 20,
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 5,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Info;

