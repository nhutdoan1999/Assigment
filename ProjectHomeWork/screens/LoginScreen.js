import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.email === email && user.password === password);

            if (user) {
                await AsyncStorage.setItem('currentUser', JSON.stringify(user));
                navigation.replace('Main');
            } else {
                Alert.alert('Error', 'Email hoặc mật khẩu không chính xác.');
            }
        } catch (error) {
            console.log('Error retrieving user data:', error);
            Alert.alert('Error', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/IELTSICON.jpg')} style={styles.logo} />
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
            <Button title="Đăng Nhập" onPress={handleLogin} color="#004080" />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Đăng Ký
            </Text>
            <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
                Quên mật khẩu?
            </Text>
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
    logo: {
        width: 200,
        height: 200,
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
    link: {
        marginTop: 12,
        color: '#00A1E4',
    },
});

export default LoginScreen;
