import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faEye,
  faThumbsDown,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import Widget from '../Widget';
import youtubeService from '../../../../../services/youtube';
import {
  formateNumber,
  getParamValue,
  useInterval
} from '../../../../../shared/shared';

const YoutubeViewWidgets = ({ widget, fetchUserWidgets }) => {
  const [video, setVideo] = useState([]);
  const [link, setLink] = useState(
    'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
  );

  useInterval(() => {
    getVideo();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getVideo = useCallback(() => {
    const value = getParamValue(
      widget,
      'URL de la vidéo',
      'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
    );
    setLink(value);
    youtubeService
      .getVideoViews(value)
      .then(async response => {
        await setVideo(response.data.items[0]);
      })
      .catch(err => {
        setVideo([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getVideo();
  }, [widget, getVideo]);

  return video && video.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'m-5 overflow-y-auto'} style={{ maxHeight: 175 }}>
        <h1
          className={
            'leading-none truncate text-2xl font-black tracking-wide catamaran hover:text-gray-600 transition-2 cursor-pointer'
          }
        >
          <a rel="noreferrer" target={'_blank'} href={link}>
            {video.snippet.title}
          </a>
        </h1>
        <span className={'text-sm after text-gray-500'}>
          {video.snippet.channelTitle}
        </span>

        <div className={'flex flex-wrap mt-5'}>
          <p className={'text-lg w-1/2 my-1'}>
            <FontAwesomeIcon icon={faEye} />
            &nbsp;{formateNumber(video.statistics.viewCount, 2)} vues
          </p>
          <p className={'text-lg w-1/2 my-1'}>
            <FontAwesomeIcon icon={faComments} />
            &nbsp;{formateNumber(video.statistics.commentCount, 0)} commentaires
          </p>
          <p className={'text-lg w-1/2 my-1'}>
            <FontAwesomeIcon icon={faThumbsUp} />
            &nbsp;{formateNumber(video.statistics.likeCount, 0)} likes
          </p>
          <p className={'text-lg w-1/2 my-1'}>
            <FontAwesomeIcon icon={faThumbsDown} />
            &nbsp;{formateNumber(video.statistics.dislikeCount, 0)} dislikes
          </p>
        </div>
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

export default YoutubeViewWidgets;
