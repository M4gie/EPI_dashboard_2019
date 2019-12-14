import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import userServices from '../services/user';

export const formateNumber = (num, digits) => {
  const symbs = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'Md' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i = symbs.length - 1;
  for (i; i > 0; i--) if (num >= symbs[i].value) break;
  return (
    (num / symbs[i].value).toFixed(digits).replace(rx, '$1') + symbs[i].symbol
  );
};

export const getParamValue = (widget, key, defaultValue) => {
  if (!widget) return undefined;
  const params = widget.params;
  const obj = params.filter(function(o) {
    if (o.name === key) return o;
    else return undefined;
  });
  return obj[0] === undefined ? defaultValue : obj[0].value;
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const getToken = async service => {
  return userServices
    .getToken(service)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getUToken = () => {
  return Cookies.get('u_token');
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
