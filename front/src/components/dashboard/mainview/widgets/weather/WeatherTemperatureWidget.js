import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faWind, faTint } from '@fortawesome/free-solid-svg-icons';
import weatherService from '../../../../../services/weather';
import Widget from '../Widget';
import { getParamValue, useInterval } from '../../../../../shared/shared';

const WeatherTemperatureWidget = ({ widget, fetchUserWidgets }) => {
  const [weather, setWeather] = useState([]);

  useInterval(() => {
    getWeather();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getWeather = useCallback(() => {
    weatherService
      .getWeather(getParamValue(widget, 'Ville', 'Lille'))
      .then(async response => {
        await setWeather(response);
      })
      .catch(err => {
        setWeather([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getWeather();
  }, [widget, getWeather]);

  return weather && weather.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div
        className={'flex text-center mx-auto text-gray-800 overflow-y-auto'}
        style={{ maxHeight: 175 }}
      >
        <div className={'w-1/2 text-center'}>
          <img
            alt={'Météo'}
            className={'text-center m-auto'}
            src={
              'http://openweathermap.org/img/wn/' +
              weather.data.weather[0].icon +
              '@2x.png'
            }
          />
          <h1
            className={
              'leading-none text-2xl font-black tracking-wide mb-0 catamaran'
            }
          >
            {weather.data.name}
          </h1>
          <h2 className={'text-md'}>
            {weather.data.weather[0].description.charAt(0).toUpperCase() +
              weather.data.weather[0].description.slice(1)}
          </h2>
        </div>
        <div className={'w-1/2 py-8'}>
          <h2
            className={
              'leading-none text-4xl font-black tracking-wide mb-4 catamaran'
            }
          >
            {parseInt(weather.data.main.temp)}°C
          </h2>
          <div>
            <p>
              <FontAwesomeIcon icon={faInfo} />{' '}
              {parseInt(weather.data.main.temp_min)}°C -{' '}
              {parseInt(weather.data.main.temp_max)}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} />{' '}
              {parseInt(weather.data.wind.speed)} km/h
            </p>
            <p>
              <FontAwesomeIcon icon={faTint} />{' '}
              {parseInt(weather.data.main.humidity)} %
            </p>
          </div>
        </div>
      </div>
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          La ville indiquée en paramètre n&apos;existe pas ou il y a eu une
          erreur lors de la requête.
        </p>
      </div>
    </Widget>
  );
};

export default WeatherTemperatureWidget;
