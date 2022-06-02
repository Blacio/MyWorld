import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import {Context as CountriesContext} from '../context/CountriesContext';
import Popover from 'react-native-popover-view';
import { FontAwesome5 } from '@expo/vector-icons';

import useVisited from '../hooks/useVisited';

const TravelScreen = () => {
  const {state, getCountries, updateVisited} = useContext(CountriesContext);
  const [showPopover, setShowPopover] = useState(false);
  const [changeVisited] = useVisited();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getCountries();
  }, []);

  return <>
        <SearchBar value={searchValue} onChangeText={(text) => setSearchValue(text)} />
        <FlatList
          data={state.countries}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Popover
              from={(sourceRef, showPopover) => (
                <View>
                  <TouchableOpacity onLongPress={() => {
                    showPopover();
                  }}>
                    <View style={styles.item}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text ref={sourceRef}>{item.id}</Text>
                      {item.visited ? <FontAwesome5 style={styles.pic} name="map-marked-alt" size={30} color="black" /> : null }
                    </View>
                  </TouchableOpacity>
                </View>
              )}>
              <TouchableOpacity onPress={() => {
                changeVisited(item.id, item.visited);
              }}>
                <Text style={styles.popoverItem}>{item.visited ? 'Mark as Unvisited' : 'Mark as Visited'}</Text>
              </TouchableOpacity>
            </Popover>
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

export default TravelScreen;
