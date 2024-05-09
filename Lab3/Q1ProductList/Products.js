import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import styles from './Style';
import { Button } from 'react-native-paper';

const Products = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((d) => {
        setData(d.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.containerImage}>
          <View style={styles.containerImage}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Title: {item.title}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
            <Text style={styles.discount}>Discount: {item.discountPercentage}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
            <Text style={styles.brand}>Brand: {item.brand}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
          </View>
        </View>
        <View style ={styles.containerButton}>
        <View style ={styles.containerButton}>
          <Button style={styles.Button}>Detail {item.Button}</Button>
          <Button style={styles.Button}>Add {item.Button}</Button>
          <Button style={styles.Button}>Delete {item.Button}</Button>
        </View>
      </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Product list</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Products;