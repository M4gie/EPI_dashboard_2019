import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';

import SettingsWidget from './widgets_actions/SettingsWidget';
import DeleteWidget from './widgets_actions/DeleteWidget';

const Widget = ({ widget, children, fetchUserWidgets }) => {
  const styles = StyleSheet.create({
    banner: {
      backgroundImage: widget
        ? 'url(' +
          process.env.PUBLIC_URL +
          '/assets/banner/light' +
          widget.serviceBanner +
          '.png)'
        : 'url(' + process.env.PUBLIC_URL + '/assets/banner/lighttwitter.png',
      backgroundColor: '#6787FC'
    }
  });

  const [isOver, setIsOver] = useState(false);

  return (
    widget && (
      <div
        onMouseOver={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        className={'mb-4 px-2 min-w-full transition-2'}
        style={{ width: '100%' }}
      >
        <div
          className={
            'bg-white shadow-lg overflow-hidden rounded w-full transition-2 grow-hover'
          }
        >
          <div
            className={
              `bg-no-repeat w-full bg-blue-800 h-24 p-3 ` + css(styles.banner)
            }
          >
            {isOver === true ? (
              <div className={'absolute top-1 left-2 flex'}>
                <DeleteWidget
                  widget={widget}
                  fetchUserWidgets={fetchUserWidgets}
                />
                <SettingsWidget
                  widget={widget}
                  fetchUserWidgets={fetchUserWidgets}
                />
              </div>
            ) : (
              ''
            )}
            <div className={'float-right text-right overflow-hidden'}>
              <p className={'text-white uppercase font-bold catamaran'}>
                {widget.serviceName || 'Pas de titre'}
              </p>
              <p className={'text-gray-400 text-sm md:text-base'}>
                {widget.description || 'Pas de description'}
              </p>
            </div>
          </div>
          <div className={'w-full p-2 h-48 bg-white'}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Widget;
