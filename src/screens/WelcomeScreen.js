import React, {useState, useContext, useEffect} from 'react';
import { Context as SignContext } from '../context/SignContext';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const WelcomeScreen = () => {
  const [name, setName] = useState('Guest');

  useEffect(() => {
    trySignIn();
  }, []);

  const trySignIn = async () => {
    const token = await AsyncStorage.getItem('token');
    const name = await AsyncStorage.getItem('name');
    if(token && name) {
      setName(name);
      setTimeout(() => {
        navigate('World');
      }, 2000);
    } else if(token){
      navigate('World');
    } else {
      navigate('Authentification');
    }
  };

  return <View style={styles.container}>
    <Text style={styles.message}>Welcome, {name}</Text>
  </View>
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 500,
    padding: 20
  },
  message: {
    fontSize: 30,
    fontFamily: 'serif',
    flex: 1,
    alignSelf: 'center'
  }
})


export default WelcomeScreen;
