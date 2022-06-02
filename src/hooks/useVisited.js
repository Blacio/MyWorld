import {useContext} from 'react';
import { Context as CountriesContext } from '../context/CountriesContext';

export default () => {
  const {state, updateVisited} = useContext(CountriesContext);

  const changeVisited = async (code, visited) => {
    const foundCountry = state.countries.find(country => country.id === code);
    const updatedCountry = {...foundCountry, visited: !visited};
    await updateVisited(updatedCountry);
  }

  return [changeVisited];
}
