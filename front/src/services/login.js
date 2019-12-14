import request from '../shared/lib/AxiosWrap';

async function login(email, password) {
  return request({
    url: `/login`,
    method: 'POST',
    data: {
      email,
      password
    }
  });
}

async function loginService(service) {
  return request({
    url: `/login/oauth?name=${service}`,
    method: 'GET'
  });
}

async function register(email, password, confirmPassword) {
  return request({
    url: `/register`,
    method: 'POST',
    data: {
      email,
      password,
      password_confirmation: confirmPassword
    }
  });
}

const loginServices = {
  login,
  register,
  loginService
};

export default loginServices;
