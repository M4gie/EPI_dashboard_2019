import axios from 'axios';
import { YOUTUBE_APIKEY } from '../config';

function getSubscribers(username) {
  return axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
    method: 'GET',
    params: {
      part: 'snippet,contentDetails,statistics',
      forUsername: username,
      key: YOUTUBE_APIKEY
    }
  });
}

function getVideoViews(url) {
  let id = url;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/; //eslint-disable-line
  const match = url.match(regExp);

  if (match && match[7].length === 11) id = match[7];
  return axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
    method: 'GET',
    params: {
      part: 'snippet,contentDetails,statistics',
      id: id,
      key: YOUTUBE_APIKEY
    }
  });
}

const youtubeService = {
  getSubscribers,
  getVideoViews
};

export default youtubeService;
