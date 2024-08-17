import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Mật khẩu không khớp. Vui lòng thử lại.');
            return;
        }

        try {
            const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const emailExists = storedUsers.some(user => user.email === email);

            if (emailExists) {
                Alert.alert('Error', 'Email đã được sử dụng. Vui lòng sử dụng email khác.');
                return;
            }

            const newUser = { name, email, password };
            const updatedUsers = [...storedUsers, newUser];

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            console.log('User registered:', newUser);
            Alert.alert('Success', 'Đăng ký thành công! Vui lòng đăng nhập.');
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error saving user data:', error);
            Alert.alert('Error', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" color="#004080" size={30} />
            </TouchableOpacity>
            <Image source={require('../assets/IELTSICON.jpg')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Tên"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Đăng Ký" onPress={handleRegister} color="#004080" />
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 24,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        color: '#333',
    },
});

export default RegisterScreen;
