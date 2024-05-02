import React from "react";
import { View,Text,StyleSheet,ScrollView,Button,Alert } from "react-native";
import Data from "./Data";
import Square from "./Square";
import style from "./style";

export default App=()=> {
  return (
    <ScrollView style={style.container}>
      {Data.map((item,index) => (
        <Square key={item} text={`Square ${index + 1}`} />
      ))}
    </ScrollView>
  );
};