import {useContext} from 'react';
import { Context as CountriesContext } from '../context/CountriesContext';

export default () => {
  const {state, updateFavourite} = useContext(CountriesContext);

  const changeFavourite = async (code, favourite) => {
    const foundCountry = state.countries.find(country => country.id === code);
    const updatedCountry = {...foundCountry, favourite: !favourite};
    await updateFavourite(updatedCountry);
  }

  return [changeFavourite];
}
