import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        try {
            const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));

            if (currentPassword !== currentUser.password) {
                Alert.alert('Error', 'Mật khẩu hiện tại không chính xác.');
                return;
            }

            if (newPassword === currentUser.password) {
                Alert.alert('Error', 'Mật khẩu mới không được trùng với mật khẩu cũ.');
                return;
            }

            if (newPassword !== confirmPassword) {
                Alert.alert('Error', 'Mật khẩu mới không khớp. Vui lòng thử lại.');
                return;
            }

            const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const updatedUsers = storedUsers.map(user =>
                user.email === currentUser.email ? { ...user, password: newPassword } : user
            );

            currentUser.password = newPassword;

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));

            Alert.alert('Success', 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.');
            navigation.replace('Login');
        } catch (error) {
            console.log('Error updating password:', error);
            Alert.alert('Error', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" color="#004080" size={30} />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu hiện tại"
                placeholderTextColor="#888"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
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
            <Button title="Đổi mật khẩu" onPress={handleChangePassword} color="#004080" />
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

export default ChangePasswordScreen;
