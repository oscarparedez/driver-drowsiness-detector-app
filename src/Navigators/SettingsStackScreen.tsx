import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import SettingsScreen from '../Screens/Settings/SettingsScreen';

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {

    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <SettingsStack.Screen
                name={"SettingsScreen"}
                component={SettingsScreen}
            />
        </SettingsStack.Navigator>
    );
};

export default SettingsStackScreen;
