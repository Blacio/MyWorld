import React from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';

const MessageForm = ({message, name, timestamp, myMessage}) => {
  const fDate = moment(timestamp).format("YYYY-MMM-DD hh:mm:ss");

  return <>
          <View style={myMessage ? styles.myMessage : styles.message}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.timestamp}>{fDate}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
      </>
}

const styles = StyleSheet.create({
  myMessage: {
    borderWidth: 2,
    borderRadius: 9,
    width: 200,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    margin: 15,
    padding: 10
  },
  message: {
    borderWidth: 2,
    borderRadius: 4,
    width: 200,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    margin: 15,
    padding: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  timestamp: {
    fontSize: 15
  },
  message: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'serif'
  }
});

export default MessageForm;
