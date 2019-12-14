import React from 'react';
import WeatherTemperatureWidget from './WeatherTemperatureWidget';

const WeatherWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'température' && (
          <WeatherTemperatureWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default WeatherWidgets;
