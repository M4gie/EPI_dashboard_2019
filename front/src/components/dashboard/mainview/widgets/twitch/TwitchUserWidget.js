import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import twitchService from '../../../../../services/twitch';
import {
  formateNumber,
  getParamValue,
  useInterval
} from '../../../../../shared/shared';
import Widget from '../Widget';

const TwitchUserWidget = ({ widget, fetchUserWidgets }) => {
  const [stream, setStream] = useState([]);

  useInterval(() => {
    getStream();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getStream = useCallback(() => {
    twitchService
      .getUser(getParamValue(widget, 'Nom d’utilisateur', 'juyinsama'))
      .then(async response => {
        await setStream(response.data.data[0]);
      })
      .catch(err => {
        setStream([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getStream();
  }, [widget, getStream]);

  return stream && stream.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'m-5 overflow-y-auto'} style={{ maxHeight: 175 }}>
        <h1
          className={
            'leading-none text-2xl font-black tracking-wide mb-0 catamaran truncate transition-2 hover:text-gray-600'
          }
        >
          <a
            rel="noreferrer"
            target={'_blank'}
            href={'http://twitch.tv/' + stream.login}
          >
            {stream.display_name}
          </a>
        </h1>
        <div className={'overflow-hidden'} style={{ maxHeight: 50 }}>
          <span className={'text-sm text-gray-500 font-normal'}>
            {stream.description}
          </span>
        </div>
        <p className={'text-lg mt-5'}>
          <FontAwesomeIcon icon={faEye} />
          &nbsp;{formateNumber(stream.view_count, 2)} vues
        </p>
      </div>
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          Ce streamer n&apos;existe pas ou il y a eu une erreur lors de la
          requête.
        </p>
      </div>
    </Widget>
  );
};

export default TwitchUserWidget;
