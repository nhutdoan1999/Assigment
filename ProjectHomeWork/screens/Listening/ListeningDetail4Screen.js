import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

const ListeningDetail4Screen = () => {
    const route = useRoute();
    const { item } = route.params;

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const [answers, setAnswers] = useState(Array(40).fill(''));

    useEffect(() => {
        return () => {
            if (sound) {
                sound.stop(() => sound.release());
            }
        };
    }, [sound]);

    const playAudio = (audioUrl) => {
        if (sound) {
            sound.stop(() => sound.release());
        }

        const newSound = new Sound(audioUrl, null, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }

            setAudioDuration(newSound.getDuration());
            newSound.play((success) => {
                if (success) {
                    console.log('Finished playing');
                } else {
                    console.log('Playback failed');
                }
                setIsPlaying(false);
            });

            setIsPlaying(true);
            trackProgress(newSound);
        });

        setSound(newSound);
    };

    const stopAudio = () => {
        if (sound) {
            sound.pause();
            setIsPlaying(false);
        }
    };

    const trackProgress = (soundInstance) => {
        const interval = setInterval(() => {
            soundInstance.getCurrentTime((seconds) => {
                setCurrentTime(seconds);
            });
        }, 1000);

        return () => clearInterval(interval);
    };

    const onSliderValueChange = (value) => {
        if (sound) {
            sound.setCurrentTime(value);
            setCurrentTime(value);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const submitAnswer = {
        lis_ans_id: item.lis_id,
        lis_id: item.lis_id,
        lis_answer_1: answers[0],
        lis_answer_2: answers[1],
        lis_answer_3: answers[2],
        lis_answer_4: answers[3],
        lis_answer_5: answers[4],
        lis_answer_6: answers[5],
        lis_answer_7: answers[6],
        lis_answer_8: answers[7],
        lis_answer_9: answers[8],
        lis_answer_10: answers[9],
        lis_answer_11: answers[10],
        lis_answer_12: answers[11],
        lis_answer_13: answers[12],
        lis_answer_14: answers[13],
        lis_answer_15: answers[14],
        lis_answer_16: answers[15],
        lis_answer_17: answers[16],
        lis_answer_18: answers[17],
        lis_answer_19: answers[18],
        lis_answer_20: answers[19],
        lis_answer_21: answers[20],
        lis_answer_22: answers[21],
        lis_answer_23: answers[22],
        lis_answer_24: answers[23],
        lis_answer_25: answers[24],
        lis_answer_26: answers[25],
        lis_answer_27: answers[26],
        lis_answer_28: answers[27],
        lis_answer_29: answers[28],
        lis_answer_30: answers[29],
        lis_answer_31: answers[30],
        lis_answer_32: answers[31],
        lis_answer_33: answers[32],
        lis_answer_34: answers[33],
        lis_answer_35: answers[34],
        lis_answer_36: answers[35],
        lis_answer_37: answers[36],
        lis_answer_38: answers[37],
        lis_answer_39: answers[38],
        lis_answer_40: answers[39]
    }

    const [data, setData] = useState([])
    const submitAnswers = async () => {
        try {
            const response = await fetch('http://10.60.1.203:8080/data/listening/lis_ans/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitAnswer),
            });

            if (response.ok) {
                setData(await response.json()); // Parse the response as JSON
                Alert.alert('Success', 'Your answers have been submitted!');

            } else {
                Alert.alert('Error', 'There was a problem submitting your answers.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error occurred while submitting your answers.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.lis_topic}</Text>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: item.lis_question_1 }} style={styles.image} />

                <View style={styles.audioControls}>
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaying) {
                                stopAudio();
                            } else {
                                playAudio(item.lis_audio_1);
                            }
                        }}
                        style={styles.iconButton}
                    >
                        <Ionicons name={isPlaying ? "stop" : "play"} size={40} color="#4CAF50" />
                    </TouchableOpacity>

                    <Slider
                        value={currentTime}
                        onValueChange={onSliderValueChange}
                        maximumValue={audioDuration}
                        minimumTrackTintColor="#4CAF50"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#4CAF50"
                        style={styles.slider}
                    />
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {[...Array(10)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={answers[index]}
                            onChangeText={(value) => handleAnswerChange(index, value)}
                            placeholder={`Answer ${index + 1}`}
                        />
                    ))}
                </View>

                <Image source={{ uri: item.lis_question_2 }} style={styles.image} />

                {/* Audio Controls with Icons */}
                <View style={styles.audioControls}>
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaying) {
                                stopAudio();
                            } else {
                                playAudio(item.lis_audio_2);
                            }
                        }}
                        style={styles.iconButton}
                    >
                        <Ionicons name={isPlaying ? "stop" : "play"} size={40} color="#4CAF50" />
                    </TouchableOpacity>

                    {/* Slider for audio */}
                    <Slider
                        value={currentTime}
                        onValueChange={onSliderValueChange}
                        maximumValue={audioDuration}
                        minimumTrackTintColor="#4CAF50"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#4CAF50"
                        style={styles.slider}
                    />
                </View>

                {/* Time Display (left: current time, right: duration) */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {[...Array(10)].map((_, index) => (
                        <TextInput
                            key={index + 10}
                            style={styles.input}
                            value={answers[index + 10]}
                            onChangeText={(value) => handleAnswerChange(index + 10, value)}
                            placeholder={`Answer ${index + 11}`}
                        />
                    ))}
                </View>

                <Image source={{ uri: item.lis_question_3 }} style={styles.image} />

                {/* Audio Controls with Icons */}
                <View style={styles.audioControls}>
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaying) {
                                stopAudio();
                            } else {
                                playAudio(item.lis_audio_3);
                            }
                        }}
                        style={styles.iconButton}
                    >
                        <Ionicons name={isPlaying ? "stop" : "play"} size={40} color="#4CAF50" />
                    </TouchableOpacity>

                    {/* Slider for audio */}
                    <Slider
                        value={currentTime}
                        onValueChange={onSliderValueChange}
                        maximumValue={audioDuration}
                        minimumTrackTintColor="#4CAF50"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#4CAF50"
                        style={styles.slider}
                    />
                </View>

                {/* Time Display (left: current time, right: duration) */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {[...Array(10)].map((_, index) => (
                        <TextInput
                            key={index + 20}
                            style={styles.input}
                            value={answers[index + 20]}
                            onChangeText={(value) => handleAnswerChange(index + 20, value)}
                            placeholder={`Answer ${index + 21}`}
                        />
                    ))}
                </View>

                <Image source={{ uri: item.lis_question_4 }} style={styles.image} />

                {/* Audio Controls with Icons */}
                <View style={styles.audioControls}>
                    <TouchableOpacity
                        onPress={() => {
                            if (isPlaying) {
                                stopAudio();
                            } else {
                                playAudio(item.lis_audio_4);
                            }
                        }}
                        style={styles.iconButton}
                    >
                        <Ionicons name={isPlaying ? "stop" : "play"} size={40} color="#4CAF50" />
                    </TouchableOpacity>

                    {/* Slider for audio */}
                    <Slider
                        value={currentTime}
                        onValueChange={onSliderValueChange}
                        maximumValue={audioDuration}
                        minimumTrackTintColor="#4CAF50"
                        maximumTrackTintColor="#ddd"
                        thumbTintColor="#4CAF50"
                        style={styles.slider}
                    />
                </View>

                {/* Time Display (left: current time, right: duration) */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {[...Array(10)].map((_, index) => (
                        <TextInput
                            key={index + 30}
                            style={styles.input}
                            value={answers[index + 30]}
                            onChangeText={(value) => handleAnswerChange(index + 30, value)}
                            placeholder={`Answer ${index + 31}`}
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

export default ListeningDetail4Screen;
