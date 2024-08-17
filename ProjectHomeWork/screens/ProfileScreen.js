import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
                if (currentUser) {
                    setName(currentUser.name);
                    setEmail(currentUser.email);
                }
            } catch (error) {
                console.log('Error retrieving user data:', error);
            }
        };

        fetchUserData();
    }, [route.params]);

    const handleEdit = () => {
        navigation.navigate('EditProfileScreen', { userName: name, userEmail: email });
    };

    const handleLogout = async () => {
        // Giả lập việc đăng xuất
        await AsyncStorage.removeItem('currentUser');
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hồ Sơ Cá Nhân</Text>
            <Text style={styles.info}>Tên: {name}</Text>
            <Text style={styles.info}>Email: {email}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Chỉnh sửa" onPress={handleEdit} color="#004080" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Lịch Sử Học Tập" onPress={() => { /* logic mở lịch sử học tập */ }} color="#004080" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Đăng Xuất" onPress={handleLogout} color="#FF6347" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        color: '#004080',
    },
    info: {
        fontSize: 18,
        marginBottom: 12,
        color: '#333',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
});

export default ProfileScreen;
