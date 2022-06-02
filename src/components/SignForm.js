import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { navigate } from '../navigationRef';
import { FontAwesome5 } from '@expo/vector-icons';

const SignForm = ({ signin, btnName, errorMsg, onSubmit, signMethodText, routeName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return <>
          <View style={{flexDirection: "column", alignItems: "center"}}>
            <FontAwesome5 name="map-marked-alt" size={150} color="black" />
          </View>
          <Text>Email</Text>
          <Input onChangeText={setEmail}
                  autoCapitalize="none" autoCorrect={false}/>
          <Text>Password</Text>
          <Input onChangeText={setPassword}
                  autoCapitalize="none" autoCorrect={false} secureTextEntry/>
          {!signin ? (<>
            <Text>What's your name ?</Text>
            <Input onChangeText={setName} autoCorrect={false}/>
            </>) :
            null
          }
          <Button title={btnName} onPress={() => onSubmit({email, password, name})} />
          {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
          <TouchableOpacity onPress={() => navigate(routeName)}>
            <Text>{signMethodText}</Text>
          </TouchableOpacity>
      </>
}

const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 20,
    margin: 15
  }
});

export default SignForm;
