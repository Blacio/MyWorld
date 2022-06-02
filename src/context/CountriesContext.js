import AsyncStorage from '@react-native-async-storage/async-storage';
import createContext from './createContext';
import { navigate } from '../navigationRef';
import countries from '../api/countries';
import server from '../api/server';

const countriesReducer = (state, action) => {
  switch (action.type) {
    case 'addCountry':
      return {...state, countries: [...state.countries, action.payload]};
    case 'getCountries':
      return {...state, countries: action.payload};
    case 'updateCountry':
      return {...state, countries: [...state.countries, action.payload]};
    case 'add_error':
      return {...state, error: action.payload};
    case 'remove_error':
      return {...state, error: ''};
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'remove_error'});
};

const getCountries = (dispatch) => async () => {
    try {
      const response = await countries.get(`/countries`);
      const visitedResponse = await server.get('/visited');
      const favouritesResponse = await server.get('/favourites');
      var visited = [];
      var favourite = [];
      if(visitedResponse && visitedResponse.data) {
        visited = visitedResponse.data.map(country => country.code);
      }
      if(favouritesResponse && favouritesResponse.data) {
        favourite = favouritesResponse.data.map(country => country.code);
      }

      response.data.forEach(function(country) {
          dispatch({type: 'addCountry', payload: {
            name: country.name,
            id: country.code,
            visited: visited ? visited.includes(country.code) : false,
            favourite: favourite ? favourite.includes(country.code) : false
          }});
      });
    } catch (err) {
      dispatch({type: 'add_error', payload: 'Cannot get data'});
    }
}


const updateVisited = dispatch => async (updatedCountry) => {
  try {
    if (updatedCountry.visited) {
      await server.post('/visitedCountry', {name: updatedCountry.name, code: updatedCountry.id});
    } else {
      const userId = await AsyncStorage.getItem('token');
      await server.post('/deleteVisited', {code: updatedCountry.id, id: userId});
    }
    dispatch({type: 'updateCountry', payload: updatedCountry});
  } catch (err) {
    dispatch({type: 'add_error', payload: 'Something went wrong'});
  }
};

const updateFavourite = dispatch => async (updatedCountry) => {
  try {
    if (updatedCountry.favourite) {
      await server.post('/favouriteCountry', {name: updatedCountry.name, code: updatedCountry.id});
    } else {
      const userId = await AsyncStorage.getItem('token');
      await server.post('/deleteFavourite', {code: updatedCountry.id, id: userId});
    }
    dispatch({type: 'updateCountry', payload: updatedCountry});
  } catch (err) {
    dispatch({type: 'add_error', payload: 'Something went wrong'});
  }
};

export const {Provider, Context} = createContext(
  countriesReducer,
  {getCountries, updateFavourite, updateVisited},
  {countries: [], error: ''}
);
