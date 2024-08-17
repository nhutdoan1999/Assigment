import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendCode = async () => {
        try {
            const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.email === email);

            if (user) {
                // Giả lập gửi mã xác nhận qua email hoặc số điện thoại
                Alert.alert('Success', 'Mã xác nhận đã được gửi đến email của bạn.');
                navigation.navigate('VerifyCode', { userEmail: email });
            } else {
                Alert.alert('Error', 'Email không tồn tại.');
            }
        } catch (error) {
            console.log('Error retrieving user data:', error);
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
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Gửi mã xác nhận" onPress={handleSendCode} color="#004080" />
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

export default ForgotPasswordScreen;
