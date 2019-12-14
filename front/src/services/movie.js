import axios from 'axios';
import { CINEMA_APIKEY } from '../config';

function getMovie(movie) {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?language=fr&api_key=${CINEMA_APIKEY}&query=${movie}`,
    {
      method: 'GET',
      params: {
        query: movie
      }
    }
  );
}

function getSerie(serie) {
  return axios.get(
    `https://api.themoviedb.org/3/search/tv?language=fr&api_key=${CINEMA_APIKEY}&query=${serie}`,
    {
      method: 'GET',
      params: {
        query: serie
      }
    }
  );
}

const movieService = {
  getMovie,
  getSerie
};

export default movieService;
