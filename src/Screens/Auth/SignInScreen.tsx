import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../../Contexts/AuthContextProvider';
import { SignInStyle } from '../../styles/Auth/SignIn.style';
import { CustomAlert } from '../../Utils/CustomAlert';

const SignInScreen = () => {
  const userAction = useAuth();
  const { login } = userAction;
  const styles = SignInStyle();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const onLogin = () => {
    if (username && password) {
      login({username: username, password: password})
    } else {
      CustomAlert('Inicio de sesión fallido', 'Revisa tus datos de inicio de sesión')
    }
  }


  return (
    <View style ={styles.container}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.textfield}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Nombre de usuario'
        placeholderTextColor='grey'
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.textfield}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Contraseña'
        placeholderTextColor='grey'
      />
      <Pressable style={styles.submitbutton} onPress={() => onLogin()}>
        <Text style={styles.buttontitle}>Login</Text>
      </Pressable>
    </View>
  )
}

export default SignInScreen;