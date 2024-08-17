import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const WritingDetail4Screen = () => {
    const route = useRoute();
    const { item } = route.params;
    const navigation = useNavigation();

    const [answers, setAnswers] = useState({ answer1: '', answer2: '' });
    const [sampleText1, setSampleText1] = useState(''); // State for storing the fetched sample text for question 1
    const [sampleText2, setSampleText2] = useState(''); // State for storing the fetched sample text for question 2
    const [loadingSample1, setLoadingSample1] = useState(false); // State for loading status of the first sample fetch
    const [loadingSample2, setLoadingSample2] = useState(false); // State for loading status of the second sample fetch

    // Handle input changes for the answers
    const handleAnswerChange = (key, value) => {
        setAnswers(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    // Payload for submitting answers
    const submitAnswer = {
        wri_ans_id: item.wri_id,
        wri_id: item.wri_id,
        wri_answer_1: answers.answer1,
        wri_answer_2: answers.answer2
    };

    let responseData;

    // Submit the answers
    const submitAnswers = async () => {
        try {
            const response = await fetch('http://10.60.1.203:8080/data/writing/wri_ans/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitAnswer),
            });

            if (response.ok) {
                responseData = await response.json();
                console.log('Response Data:', responseData);
                Alert.alert('Success', 'Your answers have been submitted!');
            } else {
                Alert.alert('Error', 'There was a problem submitting your answers.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error occurred while submitting your answers.');
        }
        navigation.navigate('ResultWritingScreen', { data: responseData });
    };

    // Fetch sample text for the specified question
    const fetchSampleText = async (taskName, taskNumber) => {
        const sampleAnswer = {
            responseType: 'json',
            taskName: taskName,
            task: taskNumber
        };

        if (taskNumber === 1) {
            setLoadingSample1(true);
        } else if (taskNumber === 2) {
            setLoadingSample2(true);
        }

        try {
            const response = await fetch('http://10.60.1.203:8080/data/openai/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sampleAnswer),
            });

            if (response.ok) {
                const sampleData = await response.json();
                if (taskNumber === 1) {
                    setSampleText1(sampleData.data?.answer || 'Sample not available');
                } else if (taskNumber === 2) {
                    setSampleText2(sampleData.data?.answer || 'Sample not available');
                }
            } else {
                Alert.alert('Error', 'Unable to fetch sample text');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error occurred while fetching the sample');
        }

        if (taskNumber === 1) {
            setLoadingSample1(false);
        } else if (taskNumber === 2) {
            setLoadingSample2(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.wri_topic}</Text>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
                {/* Display images for the writing questions */}
                <Image source={{ uri: item.wri_question_1_url }} style={styles.image1} />
                <TextInput
                    style={styles.input}
                    value={answers.answer1}
                    onChangeText={(value) => handleAnswerChange('answer1', value)}
                    placeholder="Enter your answer for question 1"
                    multiline={true}
                />

                {/* Text box for displaying the fetched sample for question 1 */}
                <TextInput
                    style={styles.sampleBox}
                    value={sampleText1}
                    placeholder="Sample for question 1 will appear here"
                    multiline={true}
                    editable={false} // Read-only
                />

                {/* Button to fetch sample for question 1 */}
                <TouchableOpacity onPress={() => fetchSampleText(item.wri_question_1, 1)} style={styles.sampleButton} disabled={loadingSample1}>
                    <Text style={styles.sampleButtonText}>
                        {loadingSample1 ? 'Fetching Sample 1...' : 'Get Sample 1'}
                    </Text>
                </TouchableOpacity>

                <Image source={{ uri: item.wri_question_2_url }} style={styles.image2} />
                <TextInput
                    style={styles.input}
                    value={answers.answer2}
                    onChangeText={(value) => handleAnswerChange('answer2', value)}
                    placeholder="Enter your answer for question 2"
                    multiline={true}
                />

                {/* Text box for displaying the fetched sample for question 2 */}
                <TextInput
                    style={styles.sampleBox}
                    value={sampleText2}
                    placeholder="Sample for question 2 will appear here"
                    multiline={true}
                    editable={false} // Read-only
                />

                {/* Button to fetch sample for question 2 */}
                <TouchableOpacity onPress={() => fetchSampleText(item.wri_question_2, 2)} style={styles.sampleButton} disabled={loadingSample2}>
                    <Text style={styles.sampleButtonText}>
                        {loadingSample2 ? 'Fetching Sample 2...' : 'Get Sample 2'}
                    </Text>
                </TouchableOpacity>

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
    image1: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'stretch',
    },
    image2: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'stretch',
    },
    input: {
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    sampleBox: {
        width: '100%',
        minHeight: 100, // Changed to minHeight for better scroll handling
        borderColor: '#aaa',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#eaeaea',
        textAlignVertical: 'top',
        marginBottom: 20,
        maxHeight: 1600, // Set a max height to enable scrolling
        color: "#000"
    },
    sampleButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
    },
    sampleButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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

export default WritingDetail4Screen;
