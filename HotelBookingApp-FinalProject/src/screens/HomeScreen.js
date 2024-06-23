// screens/HomeScreen.js

import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png.webp')} style={styles.logo} />
      <Text style={styles.title}>Welcome to Hotel Booking App</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Search')} style={styles.button}>
        Search Hotels
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Profile')} style={styles.button}>
        Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff', // Màu xanh da trời nhạt
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', // In đậm chữ Welcome to Hotel Booking App
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat', // Đảm bảo rằng bạn đã tải và liên kết font này
    color: '#004080', // Màu xanh đậm
  },
  button: {
    marginTop: 10,
    backgroundColor: '#004080', // Màu xanh đậm cho nút bấm
  },
  buttonText: {
    color: '#ffffff', // Chữ trắng cho nút bấm
  },
});

export default HomeScreen;
