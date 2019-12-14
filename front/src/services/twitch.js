import axios from 'axios';
import { TWITCH_APIKEY } from '../config';

const helix = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: { 'Client-ID': TWITCH_APIKEY }
});

function getStream(username) {
  return helix.get(`https://api.twitch.tv/helix/streams`, {
    method: 'GET',
    params: {
      user_login: username
    }
  });
}

function getUser(username) {
  return helix.get(`https://api.twitch.tv/helix/users`, {
    method: 'GET',
    params: {
      login: username
    }
  });
}

const twitchService = {
  getStream,
  getUser
};

export default twitchService;
