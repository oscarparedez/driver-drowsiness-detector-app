import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../../Contexts/AuthContextProvider';
import { HomeStyle } from '../../styles/AppBrowse/Home.style';
import { PlateRegistrationStyle } from '../../styles/AppBrowse/PlateRegistration.style';
import { CustomAlert } from '../../Utils/CustomAlert';

const PlateRegistrationScreen = ({ navigation }: { navigation: any }): JSX.Element => {
  const userAction = useAuth();
  const { username, login } = userAction;
  const [ plateNumber, setPlateNumber ] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const styles = PlateRegistrationStyle();

  const plateTypes = [
    {label: 'Particular (P)', value: 'p'},
    {label: 'Comercial (C)', value: 'c'},
  ]

  const isNumeric = (value: string) => {
    return /^-?\d+$/.test(value);
  }

  const isLetter =(str: string) => {
    return /^[a-zA-Z]*$/.test(str);
  }

  const onPlateRegistration = () => {
    if (
        plateNumber && 
        value && 
        plateNumber.length === 6 && 
        isNumeric(plateNumber.substring(0, 3)) && 
        isLetter(plateNumber.substring(3, 6))
    ) {
        navigation.navigate('Calibrar')
    } else {
        CustomAlert('Falla en registro de placa', 'Por favor ingresa un número de placa válido')
    }
  }

  return (
    <View style={styles.container}>
        <DropDownPicker
            open={open}
            value={value}
            items={plateTypes}
            setOpen={setOpen}
            setValue={setValue}
            placeholder='Tipo de placa'
            style={styles.dropdown}
            // setItems={setItems}
        />
        <TextInput
            value={plateNumber}
            onChangeText={setPlateNumber}
            style={styles.textfield}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Placa del vehículo'
            maxLength={6}
            placeholderTextColor='grey'
        />
      <Pressable style={styles.button} onPress={() => onPlateRegistration()}>
        <Text style={styles.buttontitle}>Confirmar</Text>
      </Pressable>
    </View>
  )
}

export default PlateRegistrationScreen;