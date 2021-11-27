import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

  const [repositories, setRepositories] = useState([]);
  const [themeColor, setThemeColor] = useState('')

  useEffect(() => {
    async function handleGetRepos() {
      try {

        const userName = await AsyncStorage.getItem('@app_username_devINHouse')

        const response = await fetch(`https://api.github.com/users/${userName}/repos`)
        const data = await response.json()

        setRepositories(data)
      } catch (error) {
        console.log('Erro na requisição')
      }
    }

    handleGetRepos();
  }, []);


  useEffect(() => {
    async function handleGetColor() {
      const colorDefault = await AsyncStorage.getItem('@app_color_devINHouse')
      setThemeColor(colorDefault)
    }

    handleGetColor()
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id}
        renderItem={
          ({ item }) => (
            <View style={[styles.card, {backgroundColor: themeColor}]}>
              <Text style={styles.repositoryName}>{item.name}</Text>
              <Text style={styles.repositoryDescription}>{item.description}</Text>
            </View>
          )
        }
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderRadius: 5
  },
  repositoryName: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 5
  },
  repositoryDescription: {
    fontSize: 16,
    color: '#FFF'
  }
});
