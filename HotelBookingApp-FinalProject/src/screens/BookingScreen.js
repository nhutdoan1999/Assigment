// screens/BookingScreen.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const BookingScreen = ({ route, navigation }) => {
    const { hotel } = route.params;
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numDays, setNumDays] = useState('1');
    const [numRooms, setNumRooms] = useState('1');
    const [totalPrice, setTotalPrice] = useState(hotel.pricePerNight);

    useEffect(() => {
        const total = hotel.pricePerNight * parseInt(numDays) * parseInt(numRooms);
        setTotalPrice(total);
    }, [numDays, numRooms, hotel.pricePerNight]);

    const confirmBooking = () => {
        const booking = {
            hotelName: hotel.name,
            name,
            phoneNumber,
            roomCount: numRooms,
            numDays: numDays,
            pricePerNight: hotel.pricePerNight,
            totalPrice: totalPrice,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
        };

        navigation.navigate('Payment', { booking });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Booking for {hotel.name}</Text>
            <TextInput
                style={styles.input}
                label="Your Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                theme={{ colors: { primary: '#004080' } }}
            />
            <TextInput
                style={styles.input}
                label="Your Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                mode="outlined"
                theme={{ colors: { primary: '#004080' } }}
            />
            <TextInput
                style={styles.input}
                label="Number of Days"
                value={numDays}
                onChangeText={setNumDays}
                mode="outlined"
                keyboardType="numeric"
                theme={{ colors: { primary: '#004080' } }}
            />
            <TextInput
                style={styles.input}
                label="Number of Rooms"
                value={numRooms}
                onChangeText={setNumRooms}
                mode="outlined"
                keyboardType="numeric"
                theme={{ colors: { primary: '#004080' } }}
            />
            <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
            <Button mode="contained" onPress={confirmBooking} style={styles.button} labelStyle={styles.buttonText}>
                Confirm Booking
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: '#004080',
    },
    input: {
        marginBottom: 20,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#004080',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#004080',
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default BookingScreen;
