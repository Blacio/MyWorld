import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Context as ChatContext} from '../context/ChatContext';
import MessageForm from '../components/MessageForm';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({route, navigation}) => {
  const { code, name, username, token } = route.params;
  const {state, getMessages, addMessage} = useContext(ChatContext);
  const [messageValue, setMessageValue] = useState('');
  const inputRef = useRef();
  const flatListRef = useRef();

  useEffect(() => {
    getMessages(route.params.code);
  }, [route, navigation]);

  return <>
    <FlatList ref={flatListRef}
      data={state.messages}
      keyExtractor={item => item.timestamp}
      renderItem={({item}) => {
        return <MessageForm message={item.message} name={item.name} timestamp={item.timestamp}
          myMessage={item.userId === state.id} />
      }}/>
      <View style={styles.sendBar}>
        <Input ref={inputRef} style={styles.messageInput} onChangeText={(newValue) => setMessageValue(newValue)} />
        <TouchableOpacity style={styles.sendButton} onPress={() => {
          inputRef.current.blur();
          inputRef.current.clear();
          addMessage({
            name: username,
            timestamp: new Date().getTime(),
            message: messageValue,
            code: code
          }, () => {
              flatListRef.current.scrollToEnd();
          });
        }}>
          <Ionicons name="send-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
  </>
}

const styles = StyleSheet.create({
  sendBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingEnd: 40
  },
  messageInput: {
    margin: 5
  },
  sendButton: {
    margin: 5,
    alignSelf: 'center'
  }
})

export default ChatScreen;
