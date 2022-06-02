import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as SignContext} from '../context/SignContext';

const AccountScreen = () => {
  const { signout } = useContext(SignContext);

  return <View style={{paddingVertical: 50}}>
    <Button title="SIGN OUT" style={{margin: 100}} onPress={signout}/>
  </View>
}

const styles = StyleSheet.create({

})

export default AccountScreen;
