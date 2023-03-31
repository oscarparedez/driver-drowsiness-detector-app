import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppState, AppNavigationState } from '../Contexts/AppContextProvider';
import OfflineStackScreen from './OfflineStackScreen';
import SplashScreen from '../Screens/Splash/SplashScreen';
import AuthStackScreen from './AuthStackScreen';
import AppBrowseStackScreen from './AppBrowseStackScreen';
import BottomTabsScreen from './BottomTabsScreen';

const RootStack = createStackNavigator();
const RootStackScreen = () => {
    const { appNavigationState } = useAppState();

    console.debug('[appNavigationState] >>> ', appNavigationState);

    const screenForAppState = (appState: AppNavigationState) => {
        switch (appState) {
            case 'INIT':
                return <RootStack.Screen name="Loading" component={SplashScreen} />;
            case 'OFFLINE':
                return <RootStack.Screen name="Offline" component={OfflineStackScreen} />;
            case 'AUTH':
                return <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />;
            case 'BROWSE_APP':
                return <RootStack.Screen name="BottomTabsScreen" component={BottomTabsScreen} />;
        }
    };

    return (
        <RootStack.Navigator
            screenOptions={{
                animationEnabled: false,
                presentation: 'modal',
                headerShown: false
            }}>
            {screenForAppState(appNavigationState)}
        </RootStack.Navigator>
    );
};

export default () => {
    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor='transparent' />
            <RootStackScreen />
        </NavigationContainer>
    );
};
