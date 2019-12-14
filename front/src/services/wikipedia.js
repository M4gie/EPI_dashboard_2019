import axios from 'axios';

function getSearch(search) {
  return axios.get(
    `https://fr.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${search}`,
    {
      method: 'GET'
    }
  );
}

const wikipediaService = {
  getSearch
};

export default wikipediaService;
