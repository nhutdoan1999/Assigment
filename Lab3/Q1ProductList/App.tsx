import React from 'react';
import { View, StyleSheet } from 'react-native';
import Products from './Products';
import styles from './Style';

const App = () => {
  return (
    <View style={styles.container}>
      <Products />
    </View>
  );
};

export default App;