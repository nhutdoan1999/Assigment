// screens/HotelDetailsScreen.js

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';

const HotelDetailsScreen = ({ route, navigation }) => {
    const { hotel } = route.params;

    // Xác định hình ảnh dựa trên tên khách sạn
    let hotelImage;
    switch (hotel.name) {
        case 'Hotel A':
            hotelImage = require('../assets/hotelA.png.webp');
            break;
        case 'Hotel B':
            hotelImage = require('../assets/hotelB.png.webp');
            break;
        case 'Hotel C':
            hotelImage = require('../assets/hotelC.png.webp');
            break;
        default:
            hotelImage = null;
    }

    return (
        <View style={styles.container}>
            {hotelImage && <Image source={hotelImage} style={styles.image} />}
            <Card style={styles.card}>
                <Card.Title title={hotel.name} titleStyle={styles.cardTitle} />
                <Card.Content>
                    <Text style={styles.cardContent}>{hotel.description}</Text>
                    <Text style={styles.cardContent}>Rooms: {hotel.roomCount}</Text>
                    <Text style={styles.cardContent}>Price per night: ${hotel.pricePerNight}</Text>
                </Card.Content>
            </Card>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Booking', { hotel })}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Book Now
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
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
    },
    cardTitle: {
        color: '#004080',
    },
    cardContent: {
        color: '#333333',
    },
    button: {
        backgroundColor: '#004080',
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default HotelDetailsScreen;
