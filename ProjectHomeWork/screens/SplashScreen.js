import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 2000); // Giả lập thời gian chờ 2 giây rồi chuyển đến màn hình đăng nhập
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to EnglishExamApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004080',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default SplashScreen;
