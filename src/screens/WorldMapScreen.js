import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';

const WorldMapScreen = () => {

  return <>
    <MapView style={styles.map}/>
  </>
}

const styles = StyleSheet.create({
  map: {
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
   }
})

export default WorldMapScreen;
