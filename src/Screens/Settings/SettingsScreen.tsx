import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContextProvider';

const SettingsScreen = () => {
  const userAction = useAuth();
  const { logout } = userAction;
  return (
    <View style ={{flex: 1, justifyContent: 'center', 'alignItems': 'center'}}>
      <Text>SettingsScreen</Text>
      <Pressable onPress={() => {
        console.log('pressed')
        logout()
      }}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default SettingsScreen;