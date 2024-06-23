// screens/LoginScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Giả định rằng không cần kiểm tra tài khoản
    await AsyncStorage.setItem('userEmail', email);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png.webp')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        theme={{ colors: { primary: '#004080' } }}
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        theme={{ colors: { primary: '#004080' } }}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button} labelStyle={styles.buttonText}>
        Login
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
    backgroundColor: '#f0f8ff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    color: '#004080',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#004080',
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default LoginScreen;
