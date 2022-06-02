import AsyncStorage from '@react-native-async-storage/async-storage';
import createContext from './createContext';
import server from '../api/server';

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'getMessages':
      return action.payload;
    case 'addMessage':
      return {...state, messages: [...state.messages, action.payload]};
    default:
      return state;
  }
};

const getMessages = (dispatch) => async (countryCode) => {
    try {
      const messagesResponse = await server.post('/messages', {code: countryCode});
      dispatch({type: 'getMessages', payload: messagesResponse.data});
    } catch (err) {
      dispatch({type: 'getMessages', payload: {messages: [], id: null}});
    }
}

const addMessage = (dispatch) => async (message, callback) => {
    try {
      const newMessage = await server.post('/newMessage', message);
      dispatch({type: 'addMessage', payload: newMessage.data});
      callback();
    } catch (err) {
      dispatch({type: 'addMessage', payload: {}});
    }
}

export const {Provider, Context} = createContext(
  chatReducer,
  {getMessages, addMessage},
  {messages: [], id: null}
);
