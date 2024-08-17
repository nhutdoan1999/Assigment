import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReadingDetail3Screen = () => {
    const route = useRoute();
    const { item } = route.params;
    const navigation = useNavigation();

    const [answers, setAnswers] = useState(Array(40).fill(''));
    const [data, setData] = useState([]);


    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };
    const submitAnswer = {
        rea_ans_id: item.rea_id,
        rea_id: item.rea_id,
        rea_answer_1: answers[0],
        rea_answer_2: answers[1],
        rea_answer_3: answers[2],
        rea_answer_4: answers[3],
        rea_answer_5: answers[4],
        rea_answer_6: answers[5],
        rea_answer_7: answers[6],
        rea_answer_8: answers[7],
        rea_answer_9: answers[8],
        rea_answer_10: answers[9],
        rea_answer_11: answers[10],
        rea_answer_12: answers[11],
        rea_answer_13: answers[12],
        rea_answer_14: answers[13],
        rea_answer_15: answers[14],
        rea_answer_16: answers[15],
        rea_answer_17: answers[16],
        rea_answer_18: answers[17],
        rea_answer_19: answers[18],
        rea_answer_20: answers[19],
        rea_answer_21: answers[20],
        rea_answer_22: answers[21],
        rea_answer_23: answers[22],
        rea_answer_24: answers[23],
        rea_answer_25: answers[24],
        rea_answer_26: answers[25],
        rea_answer_27: answers[26],
        rea_answer_28: answers[27],
        rea_answer_29: answers[28],
        rea_answer_30: answers[29],
        rea_answer_31: answers[30],
        rea_answer_32: answers[31],
        rea_answer_33: answers[32],
        rea_answer_34: answers[33],
        rea_answer_35: answers[34],
        rea_answer_36: answers[35],
        rea_answer_37: answers[36],
        rea_answer_38: answers[37],
        rea_answer_39: answers[38],
        rea_answer_40: answers[39]
    }
    let responseData;
    const submitAnswers = async () => {
        try {
            const response = await fetch('http://10.60.1.203:8080/data/reading/rea_ans/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitAnswer),
            });

            if (response.ok) {
                responseData = await response.json();
                console.log('Response Data:', responseData);
                setData(responseData); // Save the data to state
                Alert.alert('Success', 'Your answers have been submitted!');
            } else {
                Alert.alert('Error', 'There was a problem submitting your answers.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error occurred while submitting your answers.');
        }
        navigation.navigate('ResultReadingScreen', { data: responseData }); // Navigate to ResultScreen
    };
    console.log(data); // Log the parsed JSON data

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.rea_topic}</Text>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: item.rea_question_1 }} style={styles.image} />

                <View style={styles.answersContainer}>
                    {[...Array(13)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={answers[index]}
                            onChangeText={(value) => handleAnswerChange(index, value)}
                            placeholder={`Answer ${index + 1}`}
                        />
                    ))}
                </View>

                <Image source={{ uri: item.rea_question_2 }} style={styles.image} />
                <View style={styles.answersContainer}>
                    {[...Array(13)].map((_, index) => (
                        <TextInput
                            key={index + 13}
                            style={styles.input}
                            value={answers[index + 13]}
                            onChangeText={(value) => handleAnswerChange(index + 13, value)}
                            placeholder={`Answer ${index + 14}`}
                        />
                    ))}
                </View>

                <Image source={{ uri: item.rea_question_3 }} style={styles.image} />
                <View style={styles.answersContainer}>
                    {[...Array(14)].map((_, index) => (
                        <TextInput
                            key={index + 26}
                            style={styles.input}
                            value={answers[index + 26]}
                            onChangeText={(value) => handleAnswerChange(index + 26, value)}
                            placeholder={`Answer ${index + 27}`}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={submitAnswers} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit Answers</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 600,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 10,
    },
    audioControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    iconButton: {
        marginRight: 15,
    },
    slider: {
        flex: 1,
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    answersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    input: {
        width: '48%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReadingDetail3Screen;
