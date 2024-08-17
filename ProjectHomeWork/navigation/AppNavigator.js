import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import SpeakingTestScreen from '../screens/Speaking/SpeakingTestScreen';
import ListeningTestScreen from '../screens/Listening/ListeningTestScreen';
import ReadingTestScreen from '../screens/Reading/ReadingTestScreen';
import WritingTestScreen from '../screens/Writing/WritingTestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListeningDetail1Screen from '../screens/Listening/ListeningDetail1Screen';
import ListeningDetail2Screen from '../screens/Listening/ListeningDetail2Screen';
import ListeningDetail3Screen from '../screens/Listening/ListeningDetail3Screen';
import ListeningDetail4Screen from '../screens/Listening/ListeningDetail4Screen';
import ResultScreen from '../screens/Listening/ResultScreen';
import ReadingDetail1Screen from '../screens/Reading/ReadingDetail1Screen';
import ReadingDetail2Screen from '../screens/Reading/ReadingDetail2Screen';
import ReadingDetail3Screen from '../screens/Reading/ReadingDetail3Screen';
import ReadingDetail4Screen from '../screens/Reading/ReadingDetail4Screen';
import ResultReadingScreen from '../screens/Reading/ResultReadingScreen';
import WritingDetail1Screen from '../screens/Writing/WritingDetail1Screen';
import WritingDetail2Screen from '../screens/Writing/WritingDetail2Screen';
import WritingDetail3Screen from '../screens/Writing/WritingDetail2Screen';
import WritingDetail4Screen from '../screens/Writing/WritingDetail4Screen';
import ResultWritingScreen from '../screens/Writing/ResultWritingScreen';
import SpeakingDetailScreen from '../screens/Speaking/SpeakingDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionsWithLogo = {
    headerRight: () => (
        <Image
            source={require('../assets/IELTSICON.jpg')}
            style={{ width: 30, height: 30, marginRight: 10 }}
        />
    ),
};

const HomeStack = () => (
    <Stack.Navigator screenOptions={screenOptionsWithLogo}>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Home' }}
        />
        <Stack.Screen
            name="ListeningTestScreen"
            component={ListeningTestScreen}
            options={{ title: 'Listening Test' }}
        />
        <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ title: 'Result Listening Screen' }}
        />

    </Stack.Navigator>
);

const TestStack = () => (
    <Stack.Navigator screenOptions={screenOptionsWithLogo}>
        <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{ title: 'Tests' }}
        />
        <Stack.Screen
            name="SpeakingTestScreen"
            component={SpeakingTestScreen}
            options={{ title: 'Speaking Test' }}
        />
        <Stack.Screen
            name="SpeakingDetailScreen"
            component={SpeakingDetailScreen}
            options={{ title: 'Speaking Test Detail' }}
        />
        <Stack.Screen
            name="ListeningTestScreen"
            component={ListeningTestScreen}
            options={{ title: 'Listening Test' }}
        />
        <Stack.Screen
            name="ListeningDetail1Screen"
            component={ListeningDetail1Screen}
            options={{ title: 'Listening Test Detail 1' }}
        />
        <Stack.Screen
            name="ListeningDetail2Screen"
            component={ListeningDetail2Screen}
            options={{ title: 'Listening Test Detail 2' }}
        />
        <Stack.Screen
            name="ListeningDetail3Screen"
            component={ListeningDetail3Screen}
            options={{ title: 'Listening Test Detail 3' }}
        />
        <Stack.Screen
            name="ListeningDetail4Screen"
            component={ListeningDetail4Screen}
            options={{ title: 'Listening Test Detail 4' }}
        />
        <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ title: 'Result Listening Screen' }}
        />
        <Stack.Screen
            name="ReadingTestScreen"
            component={ReadingTestScreen}
            options={{ title: 'Reading Test' }}
        />
        <Stack.Screen
            name="ReadingDetail1Screen"
            component={ReadingDetail1Screen}
            options={{ title: 'Reading Test Detail 1' }}
        />
        <Stack.Screen
            name="ReadingDetail2Screen"
            component={ReadingDetail2Screen}
            options={{ title: 'Reading Test Detail 2' }}
        />
        <Stack.Screen
            name="ReadingDetail3Screen"
            component={ReadingDetail3Screen}
            options={{ title: 'Reading Test Detail 3' }}
        />
        <Stack.Screen
            name="ReadingDetail4Screen"
            component={ReadingDetail4Screen}
            options={{ title: 'Reading Test Detail 4' }}
        />
        <Stack.Screen
            name="ResultReadingScreen"
            component={ResultReadingScreen}
            options={{ title: 'Result Reading Screen' }}
        />
        <Stack.Screen
            name="WritingTestScreen"
            component={WritingTestScreen}
            options={{ title: 'Writing Test' }}
        />
        <Stack.Screen
            name="WritingDetail1Screen"
            component={WritingDetail1Screen}
            options={{ title: 'Writing Test Detail 1' }}
        />
        <Stack.Screen
            name="WritingDetail2Screen"
            component={WritingDetail2Screen}
            options={{ title: 'Writing Test Detail 2' }}
        />
        <Stack.Screen
            name="WritingDetail3Screen"
            component={WritingDetail3Screen}
            options={{ title: 'Writing Test Detail 3' }}
        />
        <Stack.Screen
            name="WritingDetail4Screen"
            component={WritingDetail4Screen}
            options={{ title: 'Writing Test Detail 4' }}
        />
        <Stack.Screen
            name="ResultWritingScreen"
            component={ResultWritingScreen}
            options={{ title: 'Result Writing Test' }}
        />

    </Stack.Navigator>
);


const ProfileStack = () => (
    <Stack.Navigator screenOptions={screenOptionsWithLogo}>
        <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ title: 'Edit Profile' }}
        />
        <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ title: 'Change Password' }}
        />
        <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
        />
    </Stack.Navigator>
);

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FF6347',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#F5F5F5',
                },
                headerShown: false, // Ẩn header của Tab.Navigator
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tests"
                component={TestStack}
                options={{
                    tabBarLabel: 'Tests',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-text" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
