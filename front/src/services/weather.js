import axios from 'axios';
import { WEATHER_APIKEY } from '../config';

function getWeather(city) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}`,
    {
      method: 'GET',
      params: {
        lang: 'fr',
        units: 'metric',
        appid: WEATHER_APIKEY
      }
    }
  );
}

const weatherService = {
  getWeather
};

export default weatherService;
