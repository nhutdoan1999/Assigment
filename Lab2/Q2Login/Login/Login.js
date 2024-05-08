import React from 'react';
import Style from './Style';
import {
  Button,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  _Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const LoginScreen = () => {
  return (
    <View style={Style.container}>
      <Text style={Style.title}>LOGIN</Text>
      <TextInput style={Style.input} placeholder="User Name" />
      <TextInput style={Style.input} placeholder="Password" />
      <TouchableOpacity style={Style.button}>
        <Text style={Style.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;