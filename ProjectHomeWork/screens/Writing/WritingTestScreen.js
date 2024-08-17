import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WritingTestScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        fetch('http://10.60.1.203:8080/data/writing/wri_ques/get')
            .then((response) => response.json())
            .then((json) => {
                setData(json.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={`detail1-${item.wri_id}`}
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('WritingDetail1Screen', { item })}
                    >
                        <Text style={styles.title}>{item.wri_topic}</Text>
                        <Image
                            source={{ uri: 'https://th.bing.com/th/id/OIG2.ieDUFJ5mYbQ_BQ_6Du2Y?w=1024&h=1024&rs=1&pid=ImgDetMain' }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#536781',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});

export default WritingTestScreen;
