import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import {Context as CountriesContext} from '../context/CountriesContext';
import Popover from 'react-native-popover-view';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFavourite from '../hooks/useFavourite';

const CountriesScreen = ({navigation}) => {
  const {state, getCountries, updateFavourite} = useContext(CountriesContext);
  const [showPopover, setShowPopover] = useState(false);
  const [changeFavourite] = useFavourite();
  const [searchValue, setSearchValue] = useState('');
  const [username, setUsername] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    getStorage();
    getCountries();
  }, []);

  const getStorage = async () => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('name');
    setToken(token);
    setUsername(username);
  }

  return <>
        <SearchBar value={searchValue} onChangeText={(text) => setSearchValue(text)} />
        <FlatList
          data={state.countries}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            if(item.name.includes(searchValue)) {
            return <Popover from={(sourceRef, showPopover) => (
                <View>
                  <TouchableOpacity onLongPress={() => {
                    showPopover();
                  }}>
                    <View style={styles.item}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text ref={sourceRef}>{item.id}</Text>
                      {item.favourite ? <FontAwesome5 style={styles.pic} name="star" size={24} color="black" /> : null }
                    </View>
                  </TouchableOpacity>
                </View>
              )}>
              <TouchableOpacity onPress={() => {
                  changeFavourite(item.id, item.favourite);
              }}>
                <Text style={styles.popoverItem}>{item.favourite ? 'Remove from Favorites' : 'Mark as Favourite'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  navigation.navigate('World Chat', {code: item.id, name: item.name, username: username, token: token})
              }}>
                <Text style={styles.popoverItem}>Go to Chat!</Text>
              </TouchableOpacity>
            </Popover>
          } else return null;
      }} />
  </>
}

const styles = StyleSheet.create({
  item: {
    margin: 7,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10
  },
  name: {
    fontSize: 20,
    fontFamily: 'serif'
  },
  pic: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    margin: 5,
  },
  popoverItem: {
    margin: 5,
    fontSize: 15
  }
})

export default CountriesScreen;
