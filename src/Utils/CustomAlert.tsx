import { Alert } from "react-native";

export const CustomAlert = (title: string, message: string, action?: () => {}) => {
    Alert.alert(title, message, [
        {text: 'OK', onPress: () => action},
      ]);
  
    const createThreeButtonAlert = () =>
      Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
  
}