import request from '../shared/lib/AxiosWrap';
import { getUToken } from '../shared/shared';

async function services() {
  return request({
    url: `/services/`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

const serviceService = {
  services
};

export default serviceService;
