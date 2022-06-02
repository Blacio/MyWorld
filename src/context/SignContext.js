import createContext from './createContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

import server from '../api/server';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', name: action.payload.name, token: action.payload.token};
    case 'clearErrorMessage':
      return {...state, errorMessage: ''};
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clearErrorMessage'});
};

const signin = (dispatch) => async ({email, password}) => {
    try {
      const response = await server.post('/signin', {email, password});
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('name', response.data.name);
      dispatch({type: 'signin', payload: {name: response.data.name, token: response.data.token}});

      navigate('World');
    } catch (err) {
      dispatch({type: 'add_error', payload: 'Something wrong with sign in'});
    }
}

const signup = (dispatch) => async ({email, password, name}) => {
      try {
        const response = await server.post('/signup', {email, password, name});
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('name', name);
        dispatch({type: 'signin', payload: {name: response.data.name, token: response.data.token}});

        navigate('World');
      } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'});
      }
}

const signout = (dispatch) => {
  return async () => {
    // somehow sign out !!!
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    dispatch({type: 'signout'});
    navigate('Authentification');
  }
}

export const {Provider, Context} = createContext(
  authReducer,
  {signin, signup, signout, clearErrorMessage},
  { token: null, name: null, errorMessage: '' }
);
