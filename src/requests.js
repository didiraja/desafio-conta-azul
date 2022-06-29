import axios from 'axios';

const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '269742604753455d7fb3826eb1939049';

export const getLocationData = (lat, lon) => {
  return axios.get(`${BASE_URI}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
};