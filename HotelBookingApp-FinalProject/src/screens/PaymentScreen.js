// screens/PaymentScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ route, navigation }) => {
    const { booking } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('visa');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');

    const handlePayment = async () => {
        if (paymentMethod === 'visa' && (!cardNumber || !cardExpiry || !cardCVC)) {
            Alert.alert('Error', 'Please fill in all card details');
            return;
        }

        const paymentDetails = {
            paymentMethod,
            cardNumber,
            cardExpiry,
            cardCVC,
        };

        const bookingWithPayment = { ...booking, paymentDetails };

        try {
            const bookings = await AsyncStorage.getItem('bookings');
            const bookingsArray = bookings ? JSON.parse(bookings) : [];
            bookingsArray.push(bookingWithPayment);
            bookingsArray.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
            await AsyncStorage.setItem('bookings', JSON.stringify(bookingsArray));
            Alert.alert('Success', 'Payment successful!');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error processing payment', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment</Text>
            <RadioButton.Group onValueChange={newValue => setPaymentMethod(newValue)} value={paymentMethod}>
                <View style={styles.radioButton}>
                    <RadioButton value="visa" />
                    <Text style={styles.radioText}>Visa Card</Text>
                </View>
            </RadioButton.Group>
            {paymentMethod === 'visa' && (
                <>
                    <TextInput
                        style={styles.input}
                        label="Card Number"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        mode="outlined"
                        keyboardType="numeric"
                        theme={{ colors: { primary: '#004080' } }}
                    />
                    <TextInput
                        style={styles.input}
                        label="Expiry Date (MM/YY)"
                        value={cardExpiry}
                        onChangeText={setCardExpiry}
                        mode="outlined"
                        keyboardType="numeric"
                        theme={{ colors: { primary: '#004080' } }}
                    />
                    <TextInput
                        style={styles.input}
                        label="CVC"
                        value={cardCVC}
                        onChangeText={setCardCVC}
                        mode="outlined"
                        keyboardType="numeric"
                        theme={{ colors: { primary: '#004080' } }}
                    />
                </>
            )}
            <Button mode="contained" onPress={handlePayment} style={styles.button} labelStyle={styles.buttonText}>
                Confirm Payment
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: '#004080',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    radioText: {
        fontSize: 16,
        color: '#004080',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#004080',
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default PaymentScreen;
