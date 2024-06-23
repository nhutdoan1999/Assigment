// screens/SettingsScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';

const SettingsScreen = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Account</List.Subheader>
                <List.Item title="Change Email" onPress={() => { }} />
                <List.Item title="Change Password" onPress={() => { }} />
            </List.Section>
            <List.Section>
                <List.Subheader>Preferences</List.Subheader>
                <View style={styles.preference}>
                    <Text>Enable Notifications</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
                <List.Item title="Language" onPress={() => { }} />
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
});

export default SettingsScreen;
