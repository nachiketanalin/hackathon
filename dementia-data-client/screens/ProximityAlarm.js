import React, { useState, useEffect, useRef } from 'react';
import { View, Text, AppState, StyleSheet, Alert as RNAlert, Switch, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';

const predefinedLocation = {
  latitude: 37.79571379442852,
  longitude: -122.39357068465881,
};

function ProximityAlarm() {
  const [location, setLocation] = useState(null);
  const [sound, setSound] = useState(null);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appIsActive, setAppIsActive] = useState(true);
  const [distance, setDistance] = useState(0);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const [alarmStoppedTime, setAlarmStoppedTime] = useState(null);

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Function to play an alarm sound
  const playAlarm = async () => {
    if (!isAlarmRinging && appIsActive && isTrackingEnabled) {
      const now = new Date();
      if (alarmStoppedTime && now - alarmStoppedTime < 2 * 60 * 1000) {
        // If alarm was stopped less than 2 minutes ago, don't play it
        return;
      }
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../assets/alarm.wav'), // Add the path to your alarm sound file here
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsAlarmRinging(true);
        await newSound.playAsync();
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    }
  };

  // Function to stop the alarm sound
  const stopAlarm = async () => {
    if (isAlarmRinging && sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsAlarmRinging(false);
        setAlarmStoppedTime(new Date());
      } catch (error) {
        console.error('Error stopping alarm:', error);
      }
    }
  };

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        setAppIsActive(true);
      } else {
        setAppIsActive(false);
        if (isAlarmRinging) {
          stopAlarm(); // Stop alarm when app goes to background
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [sound]);

  // Function to check location and navigate if out of range
  const checkLocationAndNavigate = (newLocation) => {
    const newDistance = calculateDistance(
      predefinedLocation.latitude,
      predefinedLocation.longitude,
      newLocation.latitude,
      newLocation.longitude
    );
    setDistance(newDistance);
    setLocation(newLocation);

    if (isTrackingEnabled) {
      if (newDistance > 10) { // Adjusted to 30 meters
        if (!isOutOfRange) {
          setIsOutOfRange(true);
          playAlarm();
        }
      } else {
        setIsOutOfRange(false);
        if (isAlarmRinging) {
          stopAlarm();
        }
      }
    }
  };

  // Request location permission and watch position
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          RNAlert.alert('Permission to access location was denied');
          return;
        }

        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (position) => {
            const newLocation = position.coords;
            if (isTrackingEnabled) {
              checkLocationAndNavigate(newLocation);
            }
          }
        );
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    requestLocationPermission();

    return () => {
      // Cleanup
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound, isTrackingEnabled]);

  // Function to toggle tracking
  const toggleTracking = () => {
    setIsTrackingEnabled(!isTrackingEnabled);
    if (!isTrackingEnabled) {
      setIsOutOfRange(false);
      if (isAlarmRinging) {
        stopAlarm();
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{isTrackingEnabled ? 'Tracking Enabled' : 'Tracking Disabled'}</Text>
          <Switch
            value={isTrackingEnabled}
            onValueChange={toggleTracking}
          />
        </View>
        <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} meters</Text>
      </View>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={location}
            title="Current Location"
            description="This is current location of the Patient's device."
            pinColor="blue"
          />
          <Marker
            coordinate={predefinedLocation}
            title="Predefined Location"
            description="This is predefined safe location of the Patient."
            pinColor="red"
          />
          {(location.latitude !== predefinedLocation.latitude || location.longitude !== predefinedLocation.longitude) && (
            <Polyline
              coordinates={[location, predefinedLocation]}
              strokeColor="#000"
              strokeWidth={3}
            />
          )}
        </MapView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Fetching location...</Text>
      )}
      {isAlarmRinging && (
        <TouchableOpacity style={styles.stopButton} onPress={stopAlarm}>
          <Text style={styles.stopButtonText}>Stop Alarm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 18,
  },
  stopButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 20,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },
  stopButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  distanceText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProximityAlarm;
