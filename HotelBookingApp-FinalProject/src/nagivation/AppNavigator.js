// navigation/AppNavigator.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import HotelDetailsScreen from '../screens/HotelDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/UserProfileScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import SettingsScreen from '../screens/SettingScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Home' }}
        />
        <Stack.Screen
            name="HotelDetails"
            component={HotelDetailsScreen}
            options={{
                title: 'Hotel Details',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
        <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
                title: 'Booking',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
        <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
                title: 'Payment',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
    </Stack.Navigator>
);

const SearchStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ title: 'Search' }}
        />
        <Stack.Screen
            name="HotelDetails"
            component={HotelDetailsScreen}
            options={{
                title: 'Hotel Details',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
        <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
                title: 'Booking',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
        <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
                title: 'Payment',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                title: 'Settings',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
    </Stack.Navigator>
);

const BookingHistoryStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="BookingHistoryScreen"
            component={BookingHistoryScreen}
            options={{
                title: 'Booking History',
                headerBackTitleVisible: false,
                headerTintColor: '#004080',
            }}
        />
    </Stack.Navigator>
);

const MainTabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="BookingHistory"
            component={BookingHistoryStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="history" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
