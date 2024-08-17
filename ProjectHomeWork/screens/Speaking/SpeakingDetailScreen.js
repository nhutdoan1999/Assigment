import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import axios from 'axios';
import Sound from 'react-native-sound';

const SpeakingDetailScreen = ({ route }) => {
    const { item } = route.params;
    const [recording, setRecording] = useState(null);
    const [recordingQuestion, setRecordingQuestion] = useState(null);
    const [sound, setSound] = useState(null);

    // Khởi tạo cấu hình ghi âm
    const initAudio = () => {
        const options = {
            sampleRate: 16000,  // mặc định là 44100
            channels: 1,        // 1 hoặc 2, mặc định là 1
            bitsPerSample: 16,  // 8 hoặc 16, mặc định là 16
            audioSource: 6,     // chỉ dành cho Android
            wavFile: 'test.wav' // mặc định là 'audio.wav'
        };
        AudioRecord.init(options);
    };

    const startRecording = (questionId) => {
        initAudio();  // Khởi tạo cấu hình trước khi bắt đầu ghi âm
        const audioPath = `${AudioUtils.DocumentDirectoryPath}/${questionId}.wav`;

        AudioRecord.start();
        setRecording({ questionId, uri: audioPath });
        setRecordingQuestion(questionId);
        console.log('Recording started', audioPath);
    };

    const stopRecording = async () => {
        try {
            const filePath = await AudioRecord.stop();
            setRecording((prev) => ({ ...prev, uri: filePath }));
            console.log('Recording stopped', filePath);
        } catch (error) {
            console.error(error);
        }
    };

    const submitRecording = async (questionId, uri) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: 'audio/wav',
                name: `${questionId}.wav`,
            });
            await axios.post('http://10.60.1.203:8080/data/speech/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Recording submitted successfully');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit recording');
        }
    };

    const playSound = (uri) => {
        const newSound = new Sound(uri, null, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            newSound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
        setSound(newSound);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.topic}>{item.spe_topic}</Text>
            {Object.keys(item).map((key) => {
                if (key.startsWith('spe_question')) {
                    return (
                        <View key={key} style={styles.questionContainer}>
                            <Text style={styles.question}>{item[key]}</Text>
                            {recordingQuestion !== key ? (
                                <Button
                                    title="Start Recording"
                                    onPress={() => startRecording(key)}
                                />
                            ) : (
                                <>
                                    <Button title="Stop Recording" onPress={stopRecording} />
                                    <Button
                                        title="Submit Recording"
                                        onPress={() => submitRecording(key, recording?.uri)}
                                    />
                                    {recording?.uri && (
                                        <Button
                                            title="Play Recording"
                                            onPress={() => playSound(recording.uri)}
                                        />
                                    )}
                                </>
                            )}
                        </View>
                    );
                }
                return null;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    topic: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    questionContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    question: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default SpeakingDetailScreen;
