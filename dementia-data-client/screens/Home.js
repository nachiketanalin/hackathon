import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

// Dummy data as a single string
const dummyTip = "Remember to take breaks and stretch during long work sessions.";

const Home = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    fetchTip();
  }, []);

  const fetchTip = async () => {
    try {
      // Uncomment and replace with actual API call when ready
      const response = await axios.get('https://flask-app-service-x4rxrrxcfq-ey.a.run.app/tips');
      setTip(response.data.response);

      // Using dummy data for now
      // setTip(dummyTip);
    } catch (error) {
      console.error('Error fetching tip:', error);
      setTip(dummyTip); // Use dummy data in case of error
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        resizeMode='contain' // Ensure the logo scales properly without getting cut off
      />
      <Text style={styles.subheading}>Tip of the Day</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001f3f',
    alignItems: 'center', // Center items horizontally
  },
  logo: {
    width: '80%', // Adjust width to fit within the container
    height: undefined, // Height will adjust based on aspect ratio
    aspectRatio: 1, // Maintain aspect ratio of the logo
    marginBottom: 20, // Space below the logo
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  tipContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    width: '100%', // Full width of the container
    maxWidth: 400, // Optional: Max width for larger screens
  },
  tipText: {
    fontSize: 18,
    color: '#001f3f',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Home;
