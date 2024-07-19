// Header.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Header = () => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.navItem}><Text style={styles.text}>Helping Hand for Dementia Care</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
  },
  navLinks: {
    flexDirection: 'row',
  },
  navItem: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc'
  }
});

export default Header;
