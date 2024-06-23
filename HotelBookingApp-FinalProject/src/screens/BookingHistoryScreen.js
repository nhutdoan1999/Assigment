// screens/BookingHistoryScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingHistoryScreen = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const bookings = await AsyncStorage.getItem('bookings');
                if (bookings) {
                    const bookingsArray = JSON.parse(bookings);
                    bookingsArray.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
                    setBookings(bookingsArray);
                }
            } catch (error) {
                console.error('Error loading bookings', error);
            }
        };

        loadBookings();
    }, []);

    const deleteBooking = async (index) => {
        Alert.alert(
            'Delete Booking',
            'Are you sure you want to delete this booking?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedBookings = bookings.filter((_, i) => i !== index);
                            setBookings(updatedBookings);
                            await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
                        } catch (error) {
                            console.error('Error deleting booking', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.cardContent}>Name: {item.name}</Text>
                            <Text style={styles.cardContent}>Phone Number: {item.phoneNumber}</Text>
                            <Text style={styles.cardContent}>Hotel: {item.hotelName}</Text>
                            <Text style={styles.cardContent}>Rooms: {item.roomCount}</Text>
                            <Text style={styles.cardContent}>Days: {item.numDays}</Text>
                            <Text style={styles.cardContent}>Price per night: ${item.pricePerNight}</Text>
                            <Text style={styles.cardContent}>Total Price: ${item.totalPrice}</Text>
                            <Text style={styles.cardContent}>Date: {item.date}</Text>
                            <Text style={styles.cardContent}>Time: {item.time}</Text>
                            <IconButton
                                icon="delete"
                                color="red"
                                size={20}
                                onPress={() => deleteBooking(index)}
                                style={styles.deleteButton}
                            />
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    card: {
        marginBottom: 10,
    },
    cardContent: {
        color: '#333333',
    },
    deleteButton: {
        alignSelf: 'flex-end',
    },
});

export default BookingHistoryScreen;
