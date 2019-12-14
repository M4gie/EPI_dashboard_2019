import axios from 'axios';
import { getToken } from '../shared/shared';

async function getOwnRepos(order) {
  const token = await getToken('github');

  if (token === undefined) return undefined;

  if (order.toLowerCase() === 'ascendant') order = 'asc';
  else order = 'desc';

  return axios.get(`https://api.github.com/user/repos`, {
    method: 'GET',
    params: {
      direction: order
    },
    headers: { Authorization: `Bearer ${token.github_token}` }
  });
}

async function getOwnFavs(order) {
  const token = await getToken('github');

  if (token === undefined) return undefined;

  if (order.toLowerCase() === 'ascendant') order = 'asc';
  else order = 'desc';

  return axios.get(`https://api.github.com/user/starred`, {
    method: 'GET',
    params: {
      direction: order
    },
    headers: { Authorization: `Bearer ${token.github_token}` }
  });
}

async function getOwnFollowers() {
  const token = await getToken('github');

  if (token === undefined) return undefined;

  return axios.get(`https://api.github.com/user/followers`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token.github_token}` }
  });
}

const githubService = {
  getOwnRepos,
  getOwnFavs,
  getOwnFollowers
};

export default githubService;
