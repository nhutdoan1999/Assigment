import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionsScreen from './Transaction';
import TransactionDetail from './TransDetails';

const Stack = createStackNavigator();
const TransactionMain = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Transaction"
                    component={TransactionsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={TransactionDetail}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default TransactionMain;