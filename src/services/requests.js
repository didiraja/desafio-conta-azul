import axios from 'axios';

const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '269742604753455d7fb3826eb1939049';

export const getLocationData = (cityName) => {
  return axios.get(`${BASE_URI}?q=${cityName}&appid=${API_KEY}&units=metric`)
};

export const getFakeLocationData = (endpoint) => {
  return axios.get(`http://localhost:3000/${endpoint}`)
};

export async function getUrubiciData() {
  return getLocationData('urubici')
      .then(res => {
        return {
          status: 'completed',
          data: res.data
        }
      })
      .catch(e => {

        console.log(e);
        return {
          status: 'error',
        };
      });
};

export async function getNuukData() {
  return getLocationData('nuuk')
      .then(res => {
        return {
          status: 'completed',
          data: res.data
        }
      })
      .catch(e => {

        console.log(e);
        return {
          status: 'error',
        };
      });
};

export async function getNairobiData() {
  return getLocationData('nairobi')
      .then(res => {
        return {
          status: 'completed',
          data: res.data
        }
      })
      .catch(e => {

        console.log(e);
        return {
          status: 'error',
        };
      });
};