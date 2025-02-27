import React from 'react';
import ProductListScreen from './Product/ProductList';
import AddProductScreen from './Product/AddProduct';
import SearchProductScreen from './Product/SearchProduct';
import DetailScreen from './Product/DetailScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

export default App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'ProductListScreen',
      title: 'Products',
      focusedIcon: 'format-list-bulleted',
    },
    {
      key: 'AddProductScreen',
      title: 'Add',
      focusedIcon: 'archive-plus-outline',
    },
    {
      key: 'SearchProductScreen',
      title: 'Search',
      focusedIcon: 'card-search',
    },
    {
      key: 'DetailScreen',
      title: 'Detail',
      focusedIcon: 'more',
    },
  ]);

  const RenderScreen = BottomNavigation.SceneMap({
    ProductListScreen: ProductListScreen,
    AddProductScreen: AddProductScreen,
    SearchProductScreen: SearchProductScreen,
    DetailScreen: DetailScreen,
  });
  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={RenderScreen}></BottomNavigation>
    </SafeAreaProvider>
  );
  return <DetailScreen />;
};