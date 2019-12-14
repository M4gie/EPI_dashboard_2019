import React, { useEffect, useState, useCallback } from 'react';
import { faEye, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Widget from '../Widget';
import youtubeService from '../../../../../services/youtube';
import {
  formateNumber,
  getParamValue,
  useInterval
} from '../../../../../shared/shared';

const YoutubeSubsWidget = ({ widget, fetchUserWidgets }) => {
  const [channel, setChannel] = useState([]);

  useInterval(() => {
    getChannel();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getChannel = useCallback(() => {
    youtubeService
      .getSubscribers(getParamValue(widget, 'Chaîne', 'amoodiesqueezie'))
      .then(async response => {
        await setChannel(response.data.items[0]);
      })
      .catch(err => {
        setChannel([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getChannel();
  }, [widget, getChannel]);

  return channel && channel.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'m-5 overflow-y-auto'} style={{ maxHeight: 175 }}>
        <h1
          className={
            'leading-none text-2xl font-black tracking-wide mb-0 catamaran truncate transition-2 cursor-pointer hover:text-gray-600'
          }
        >
          <a
            rel="noreferrer"
            href={'https://youtube.com/user/' + channel.snippet.customUrl}
            target={'_blank'}
          >
            {channel.snippet.title}
          </a>
        </h1>
        <span className={'text-sm text-gray-500 font-normal'}>
          {channel.snippet.customUrl}
        </span>
        <p className={'mt-5 text-lg my-1'}>
          <FontAwesomeIcon icon={faUsers} />
          &nbsp;{formateNumber(channel.statistics.subscriberCount, 2)} abonnés
        </p>
        <p className={'text-lg my-1'}>
          <FontAwesomeIcon icon={faEye} />
          &nbsp;{formateNumber(channel.statistics.viewCount, 2)} vues
        </p>
      </div>
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          La chaîne indiquée n&apos;existe pas ou un problème est survenu lors
          du chargement de ce widget.
        </p>
      </div>
    </Widget>
  );
};

export default YoutubeSubsWidget;
