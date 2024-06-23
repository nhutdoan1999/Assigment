// screens/SearchScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchHotels = () => {
        const hotels = [
            { id: '1', name: 'Hotel A', description: 'Luxurious 5-star hotel in the city center.', roomCount: 100, pricePerNight: 200 },
            { id: '2', name: 'Hotel B', description: 'Stylish hotel with modern amenities.', roomCount: 80, pricePerNight: 150 },
            { id: '3', name: 'Hotel C', description: 'Cozy boutique hotel in a quiet neighborhood.', roomCount: 50, pricePerNight: 120 },
        ];
        setResults(hotels);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Search for hotels"
                value={query}
                onChangeText={setQuery}
                mode="outlined"
                theme={{ colors: { primary: '#004080' } }}
            />
            <Button mode="contained" onPress={searchHotels} style={styles.button} labelStyle={styles.buttonText}>
                Search
            </Button>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('HotelDetails', { hotel: item })}>
                        <Card style={styles.card}>
                            <Card.Title title={item.name} titleStyle={styles.cardTitle} />
                            <Card.Content>
                                <Text style={styles.cardContent}>{item.description}</Text>
                                <Text style={styles.cardContent}>Rooms: {item.roomCount}</Text>
                                <Text style={styles.cardContent}>Price per night: ${item.pricePerNight}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
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
    input: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#004080',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
    },
    card: {
        marginBottom: 10,
    },
    cardTitle: {
        color: '#004080',
    },
    cardContent: {
        color: '#333333',
    },
});

export default SearchScreen;
