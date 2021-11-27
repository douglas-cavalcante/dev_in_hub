import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#8b0000'
];

const Settings = () => {

  const [username, setUsername] = useState('')
  const [themeColor, setThemeColor] = useState('')

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('@app_username_devINHouse', username)
      await AsyncStorage.setItem('@app_color_devINHouse', themeColor)
      Alert.alert('Aviso', 'Salvo com sucesso')
    } catch (e) {
      Alert.alert('Aviso', 'Falha ao tentar salvar')
    }
  }

  useEffect(() => {
    async function handleGetValues() {
      const userNameDefault = await AsyncStorage.getItem('@app_username_devINHouse')
      setUsername(userNameDefault)

      const themeColorDefault = await AsyncStorage.getItem('@app_color_devINHouse')
      setThemeColor(themeColorDefault)
    }
    handleGetValues()
  }, [])

  return (
    <View style={styles.container}>

      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Digite seu usuário"
        
      />


      <View style={styles.containerOptions}>
        {COLORS.map(color => 
          <TouchableOpacity 
           onPress={() => setThemeColor(color)} 
           key={color} 
           style={[styles.colorOption, {backgroundColor: color, borderWidth: themeColor === color ? 3 : 1 }]} 
           
           />)}
      </View>

      <Button onPress={handleSubmit} title="Salvar" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },  
  colorOption: {
    borderRadius: 50,
    width: 30,
    height: 30,
    margin: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '70%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#8b0000',
    borderRadius: 5
  }
})


export default Settings;