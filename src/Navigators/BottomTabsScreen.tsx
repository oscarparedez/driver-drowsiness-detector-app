import React from 'react';
import AppBrowseStackScreen from './AppBrowseStackScreen';
import SettingsStackScreen from './SettingsStackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomTabs = createBottomTabNavigator();

const BottomTabsScreen = () => {

    return (
        <BottomTabs.Navigator
            initialRouteName='AppBrowseStackScreen'
            screenOptions={{
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: { shadowColor: 'transparent' },
            }}>
            <BottomTabs.Screen
                name={"AppBrowseStackScreen"}
                component={AppBrowseStackScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={size} />
                    )
                }}
            />
            <BottomTabs.Screen
                name={"SettingsStackScreen"}
                component={SettingsStackScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="gear" color={color} size={size} />
                    )
                }}
            />
        </BottomTabs.Navigator>
    );
};

export default BottomTabsScreen;
