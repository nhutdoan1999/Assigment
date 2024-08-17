import React from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const testButtons = [
        { id: '1', title: 'Speaking Test', screen: 'SpeakingTestScreen', image: require('../assets/speaking_test_image.webp') },
        { id: '2', title: 'Listening Test', screen: 'ListeningTestScreen', image: require('../assets/listening_test_image.webp') },
        { id: '3', title: 'Reading Test', screen: 'ReadingTestScreen', image: require('../assets/reading_test_image.webp') },
        { id: '4', title: 'Writing Test', screen: 'WritingTestScreen', image: require('../assets/writing_test_image.webp') },
    ];

    const renderTestButton = ({ item }) => (
        <View style={styles.buttonContainer}>
            <Image source={item.image} style={styles.image} />
            <Button title={item.title} onPress={() => navigation.navigate(item.screen)} color="#004080" />
        </View>
    );

    return (
        <FlatList
            data={testButtons}
            renderItem={renderTestButton}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});

export default HomeScreen;
