import React from 'react';
import CinemaSearchWidget from './CinemaSearchWidget';
import CinemaSerieWidget from './CinemaSerieWidget';

const CinemaWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'search' && (
          <CinemaSearchWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
        {widget.widgetName === 'series' && (
          <CinemaSerieWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default CinemaWidgets;
