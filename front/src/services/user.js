import request from '../shared/lib/AxiosWrap';
import { getUToken } from '../shared/shared';

async function about() {
  return request({
    url: '/about.json',
    method: 'GET'
  });
}

async function widgets() {
  return request({
    url: `/user/widgets`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function services() {
  return request({
    url: `/user/services`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function subscribeService(serviceId) {
  return request({
    url: `/userservices`,
    method: 'POST',
    data: { service_id: serviceId },
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function deleteService(userServiceId) {
  return request({
    url: `/userservices/${userServiceId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function getUserWidgets() {
  return request({
    url: `/userwidgets`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function addUserWidget(serviceUserId, widgetId) {
  return request({
    url: `/userwidgets/`,
    method: 'POST',
    data: { widget_id: widgetId, service_user_id: serviceUserId, order: 0 },
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function deleteUserWidget(userWidgetId) {
  return request({
    url: `/userwidgets/${userWidgetId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function updateUserWidget(userWidgetId, params) {
  return request({
    url: `/userwidgets/${userWidgetId}`,
    method: 'PUT',
    data: {
      params: params.map(param => {
        return { param_widget_id: param.idParamWidget, value: param.value };
      })
    },
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function updateOrder(userWidgetId, order) {
  return request({
    url: `/userWidgets/${userWidgetId}/order`,
    method: 'PUT',
    data: {
      order: order
    },
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

async function getToken(service) {
  return request({
    url: `/user/token?service=${service}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getUToken()}` }
  });
}

const userServices = {
  about,
  widgets,
  services,
  subscribeService,
  deleteService,
  getUserWidgets,
  addUserWidget,
  deleteUserWidget,
  updateUserWidget,
  updateOrder,
  getToken
};

export default userServices;
