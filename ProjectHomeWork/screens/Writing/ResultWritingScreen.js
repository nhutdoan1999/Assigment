import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

const ResultWritingScreen = ({ route, navigation }) => {  // Receive navigation from props
    const { data } = route.params || {};

    if (!data) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>There is no data to display.</Text>
            </View>
        );
    }

    const { answer } = data; // Adjust according to your data structure

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scoring Feedback</Text>

            <ScrollView style={styles.scrollContainer}>
                {/* Display feedback or results */}
                <View style={styles.resultItem}>
                    <Text style={styles.feedback}>{answer}</Text>
                </View>
            </ScrollView>

            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('HomeScreen')}  // Navigate to HomeScreen
                    color="#4CAF50"
                />
                <Button
                    title="Retake Writing Test"
                    onPress={() => navigation.navigate('WritingTestScreen')}  // Navigate to WritingTestScreen
                    color="#FF9800"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#4CAF50',
    },
    scrollContainer: {
        flex: 1,
    },
    resultItem: {
        marginBottom: 10,
    },
    feedback: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default ResultWritingScreen;
