import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
                headerStyle: { shadowColor: 'transparent' },
            }}>
            <AuthStack.Screen
                name={"SignInScreen"}
                component={SignInScreen}
            />
            <AuthStack.Screen
                name={"SignUpScreen"}
                component={SignUpScreen}
            />
        </AuthStack.Navigator>
    );
};

export default AuthStackScreen;
