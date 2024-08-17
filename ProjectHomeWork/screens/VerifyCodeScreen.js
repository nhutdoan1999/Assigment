import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyCodeScreen = ({ navigation, route }) => {
    const { userEmail } = route.params;
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleVerifyCode = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Mật khẩu không khớp. Vui lòng thử lại.');
            return;
        }

        try {
            // Giả lập kiểm tra mã xác nhận (thường là mã thực tế sẽ được gửi qua email hoặc SMS)
            if (code === '123456') {
                const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
                const updatedUsers = storedUsers.map(user =>
                    user.email === userEmail ? { ...user, password: newPassword } : user
                );

                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                Alert.alert('Success', 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.');
                navigation.replace('Login');
            } else {
                Alert.alert('Error', 'Mã xác nhận không chính xác.');
            }
        } catch (error) {
            console.log('Error updating password:', error);
            Alert.alert('Error', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Mã xác nhận"
                placeholderTextColor="#888"
                value={code}
                onChangeText={setCode}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                placeholderTextColor="#888"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu mới"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Xác nhận" onPress={handleVerifyCode} color="#004080" />
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

export default VerifyCodeScreen;
