import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = ({ navigation, route }) => {
    const { userName, userEmail } = route.params || {};

    const [name, setName] = useState(userName || '');
    const [email, setEmail] = useState(userEmail || '');

    const handleSave = async () => {
        try {
            const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));

            const updatedUsers = storedUsers.map(user =>
                user.email === currentUser.email ? { ...user, name } : user
            );

            currentUser.name = name;

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));

            console.log('User data updated:', currentUser);
            Alert.alert('Success', 'Thông tin cá nhân đã được cập nhật.');
            navigation.navigate('ProfileScreen', { updatedName: name });
        } catch (error) {
            console.log('Error updating user data:', error);
            Alert.alert('Error', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePasswordScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" color="#004080" size={30} />
            </TouchableOpacity>
            <Text style={styles.label}>Email (không thể chỉnh sửa):</Text>
            <Text style={styles.email}>{email}</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
            />
            <Button title="Lưu" onPress={handleSave} color="#004080" />
            <Button title="Đổi mật khẩu" onPress={handleChangePassword} color="#FF6347" />
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
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    email: {
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
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

export default EditProfileScreen;
