// screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                if (email) {
                    setUserEmail(email);
                }
            } catch (error) {
                console.error('Error loading data', error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Avatar.Icon size={100} icon="account" />
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.text}>Email: {userEmail}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Settings')} style={styles.button}>
                Settings
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
                Logout
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: '#004080',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#004080',
        marginTop: 10,
    },
});

export default ProfileScreen;
