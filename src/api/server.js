import axios from 'axios';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: '***'
});

instance.interceptors.request.use(
  // config - request data/configuration
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, // automatically every time we make a request
  (err) => {
    return Promise.reject(err);
  } // automatically everty time we got an error
);


export default instance;
