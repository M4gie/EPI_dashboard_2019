import request from '../shared/lib/AxiosWrap';
import { getUToken } from '../shared/shared';

async function getUserWidgets() {
  return request({
    url: `/user/widgets`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

const widgetsService = {
  getUserWidgets
};

export default widgetsService;
