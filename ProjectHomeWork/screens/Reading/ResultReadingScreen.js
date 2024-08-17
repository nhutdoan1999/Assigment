import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

const ResultReadingScreen = ({ route, navigation }) => {  // Nhận navigation từ props
    const { data } = route.params || {};

    if (!data) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>There is no data to display.</Text>
            </View>
        );
    }

    const { answers, feedback, grading, total } = data.data;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Results</Text>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.resultItem}>
                    <Text style={styles.resultKey}>Grade: </Text>
                    <Text style={styles.resultValue}>{grading.score}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultKey}>Rate: </Text>
                    <Text style={styles.resultValue}>{total.rate}</Text>
                </View>

                <Text style={styles.sectionTitle}>Correct Answer</Text>
                {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                    <View key={num} style={styles.resultItem}>
                        <Text style={styles.resultKey}>{`Question ${num}: `}</Text>
                        <Text style={styles.resultValue}>{answers[`lis_answer_${num}`]}</Text>
                        <Text style={[styles.resultFeedback, feedback[`client_answer_${num}`] === 'Correct' ? styles.correct : styles.incorrect]}>
                            ({feedback[`client_answer_${num}`]})
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Nút điều hướng */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('HomeScreen')}  // Sử dụng navigation
                    color="#4CAF50"
                />
                <Button
                    title="Retake Reading Test"
                    onPress={() => navigation.navigate('ReadingTestScreen')}  // Sử dụng navigation
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    resultItem: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    resultKey: {
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    resultValue: {
        flex: 1.5,
        color: '#666',
    },
    resultFeedback: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    correct: {
        color: 'green',
    },
    incorrect: {
        color: 'red',
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

export default ResultReadingScreen;
