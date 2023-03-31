import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, UIManager, View } from 'react-native';
import { TimerType } from '../../Atoms/Timer';
import { useAppState } from '../../Contexts/AppContextProvider';
import { useTimer } from '../../Contexts/TimerContext';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const SplashScreen = () => {
    const { splashLoaded } = useAppState();
    const { stopTimer } = useTimer();

    useEffect(() => {
        splashLoaded();
        return () => {
            stopTimer(TimerType.Splash)
        }
    }, [])


  return (
    <View style ={{flex: 1, justifyContent: 'center', 'alignItems': 'center'}}>
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
    </View>
  )
}

export default SplashScreen;