import React from 'react';
import YoutubeSubsWidget from './YoutubeSubsWidget';
import YoutubeViewWidgets from './YoutubeViewsWidget';

const YoutubeWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'subscribers' && (
          <YoutubeSubsWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
        {widget.widgetName === 'view' && (
          <YoutubeViewWidgets
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default YoutubeWidgets;
