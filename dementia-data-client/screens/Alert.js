import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

// Initial appointments
const initialAppointments = [
  { id: '1', title: 'Morning Walk', time: '7:00 AM' },
  { id: '2', title: 'Breakfast', time: '8:00 AM' },
  { id: '3', title: 'Medication', time: '9:00 AM' },
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Alert = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable notifications for this app.');
      }
    };
    requestPermissions();
  }, []);

  const addAppointment = () => {
    const newAppointment = {
      id: Math.random().toString(),
      title: newTitle,
      time: newTime,
    };
    setAppointments([...appointments, newAppointment]);
    setNewTitle('');
    setNewTime('');
    setModalVisible(false);
  };

  const scheduleNotification = async (title, time) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: `${title} at ${time}`,
      },
      trigger: {
        seconds: 1, // Schedule to notify immediately for demonstration
      },
    });
  };

  const playAlarm = async () => {
    if (!sound) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../assets/alarm.wav'), // Add the path to your alarm sound file here
          { shouldPlay: true }
        );
        setSound(newSound);
        await newSound.playAsync();
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    }
  };

  const stopAlarm = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      } catch (error) {
        console.error('Error stopping alarm:', error);
      }
    }
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentText}>{item.title} - {item.time}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => scheduleNotification(item.title, item.time)} style={styles.button}>
          <Ionicons name="notifications" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playAlarm} style={styles.button}>
          <Ionicons name="alarm" size={24} color="red" />
        </TouchableOpacity>
        {sound && (
          <TouchableOpacity onPress={stopAlarm} style={styles.button}>
            <Ionicons name="stop" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Schedule</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={64} color="green" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Appointment</Text>
          <TextInput
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Time"
            value={newTime}
            onChangeText={setNewTime}
            style={styles.input}
          />
          <Button title="Add" onPress={addAppointment} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentText: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default Alert;
