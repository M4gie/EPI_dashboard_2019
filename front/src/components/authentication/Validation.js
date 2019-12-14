import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const Validation = () => {
  const getUrlParameter = name => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  useEffect(() => {
    const setToken = async () => {
      const token = getUrlParameter('token');
      await Cookies.set('u_token', token);
      window.close();
    };
    setToken();
  }, []);

  return <div>Empty :)</div>;
};

export default Validation;
