import React from 'react';
import TwitchStreamWidget from './TwitchStreamWidget';
import TwitchUserWidget from './TwitchUserWidget';

const TwitchWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'stream' && (
          <TwitchStreamWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
        {widget.widgetName === 'user' && (
          <TwitchUserWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default TwitchWidgets;
