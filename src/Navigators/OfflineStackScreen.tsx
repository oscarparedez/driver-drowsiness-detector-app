import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import OfflineScreen from '../Screens/Offline/OfflineScreen';

const OfflineStack = createStackNavigator();

const OfflineStackScreen = () => {

    return (
        <OfflineStack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
                headerStyle: { shadowColor: 'transparent' },
            }}>
            <OfflineStack.Screen
                name={"OfflineScreen"}
                component={OfflineScreen}
            />
        </OfflineStack.Navigator>
    );
};

export default OfflineStackScreen;
