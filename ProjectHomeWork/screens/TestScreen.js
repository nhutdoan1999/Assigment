import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TestScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Exams</Text>
            {/* Add more content for tests */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        color: '#004080',
    },
});

export default TestScreen;
