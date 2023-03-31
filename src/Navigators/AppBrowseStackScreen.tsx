import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/AppBrowse/HomeScreen';
import PlateRegistrationScreen from '../Screens/AppBrowse/PlateRegistrationScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import CalibrationScreen from '../Screens/AppBrowse/CalibrationScreen';

const AppBrowseStack = createStackNavigator();

const AppBrowseStackScreen = ({ navigation }: { navigation: any }) => {

    return (
        <AppBrowseStack.Navigator
            initialRouteName='HomeScreen'>
            <AppBrowseStack.Screen
                name={"Inicio"}
                component={HomeScreen}
            />
            <AppBrowseStack.Screen
                name={"Registro de Placa"}
                component={PlateRegistrationScreen}
            />
            <AppBrowseStack.Screen
                name={"Calibrar"}
                component={CalibrationScreen}
            />
        </AppBrowseStack.Navigator>
    );
};

export default AppBrowseStackScreen;
