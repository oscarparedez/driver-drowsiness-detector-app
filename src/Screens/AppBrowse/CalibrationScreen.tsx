import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContextProvider';
import { HomeStyle } from '../../styles/AppBrowse/Home.style';
import { CalibrationStyle } from '../../styles/AppBrowse/Calibration.style';

const CalibrationScreen = ({ navigation }: { navigation: any }): JSX.Element => {
  const userAction = useAuth();
  const { username, login } = userAction;
  const [ plateNumber, setPlateNumber ] = useState('');
  const styles = CalibrationStyle();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Calibración ocurre aqui</Text>
    </View>
  )
}

export default CalibrationScreen;