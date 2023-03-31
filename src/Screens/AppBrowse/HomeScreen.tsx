import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContextProvider';
import { HomeStyle } from '../../styles/AppBrowse/Home.style';

const HomeScreen = ({ navigation }: { navigation: any }): JSX.Element => {
  const userAction = useAuth();
  const { username, login } = userAction;
  const styles = HomeStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Registro de Placa')}>
        <Text style={styles.buttontitle}>Iniciar Viaje</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen;