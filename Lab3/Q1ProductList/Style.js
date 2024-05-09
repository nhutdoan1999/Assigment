import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 5,
        backgroundColor: '#f0f0f0',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 5,
        marginBottom: 16,
        borderRadius: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        marginBottom: 8,
    },
    discount: {
        fontSize: 16,
        marginBottom: 8,
        color: "#006400",
    },
    rating: {
        fontSize: 16,
        marginBottom: 8,
    },
    stock: {
        fontSize: 16,
        marginBottom: 8,
    },
    brand: {
        fontSize: 16,
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 15,
    },
    containerImage: {
        flex: 1,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        marginRight: 10,
    },
    containerButton: {
        flexDirection: "row",
        flex: 1,
        padding: 10,
        borderRadius: 25,
        margin: "auto",
    },
    Button: {
        width: 100,
        height: 50,
        backgroundColor: "#f5f5dc",
        padding: 5,
        marginLeft: 2,
        marginRight: 8,  
    },
      
});
export default styles;