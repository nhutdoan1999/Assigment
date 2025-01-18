import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const startChat = () => {
        if (name.trim()) {
            navigation.navigate('GroupScreen', { userName: name });
        } else {
            alert('Please enter your name');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
            />
            <Button title="Start Chat" onPress={startChat} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
});
export default HomeScreen;