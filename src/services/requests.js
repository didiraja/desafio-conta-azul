import axios from 'axios';
import { INITIAL_DATA } from './consts';

const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '269742604753455d7fb3826eb1939049';

export async function getLocationData(cityName) {
  return axios.get(`${BASE_URI}?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then(res => {
      return {
        ...INITIAL_DATA,
        status: 'completed',
        data: res.data
      }
    })
    .catch(e => {
      
      console.log(e);
      return {
        ...INITIAL_DATA,
        status: 'error',
      };
    });
};

export const getFakeLocationData = (endpoint) => {
  return axios.get(`http://localhost:3000/${endpoint}`)
};



