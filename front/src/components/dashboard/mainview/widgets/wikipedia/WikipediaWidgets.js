import React from 'react';
import WikipediaSearchWidget from './WikipediaSearchWidget';

const WikipediaWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'search' && (
          <WikipediaSearchWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default WikipediaWidgets;
