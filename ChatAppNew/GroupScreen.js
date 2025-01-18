import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // Connect to the server
const GroupScreen = ({ route }) => {
    const { userName } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        // Notify the server when a user joins
        socket.emit('join', userName);
        // Listen for incoming messages
        socket.on('receiveMessage', (msgData) => {
            setMessages((prevMessages) => [...prevMessages, msgData]);
        });
        socket.on('userJoined', (msg) => {
            setMessages((prevMessages) => [...prevMessages, {
                sender: 'System', message:
                    msg
            }]);
        });
        socket.on('userLeft', (msg) => {
            setMessages((prevMessages) => [...prevMessages, {
                sender: 'System', message:
                    msg
            }]);
        });
        return () => {
            socket.disconnect(); // Clean up connection when component unmounts
        };
    }, []);
    const sendMessage = () => {
        if (message.trim()) {
            const msgData = { sender: userName, message };
            socket.emit('sendMessage', msgData);
            setMessage('');
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.message}>
                        {item.sender}: {item.message}
                    </Text>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    message: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
export default GroupScreen;