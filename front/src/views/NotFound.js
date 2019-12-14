import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/index.css';
import Footer from '../components/Footer';

const NotFound = () => {
  const history = useHistory();

  const goToSafeWay = () => {
    history.push('/login');
  };

  return (
    <div className={'flex h-screen'} style={{ backgroundColor: '#232b44' }}>
      <div className={'m-auto'}>
        <h1
          style={{ letterSpacing: 10 }}
          className={
            'my-4 uppercase font-bold sm:text-4xl text-center my-2 text-xl text-white'
          }
        >
          &nbsp;Route non définie
          <span className={'blinking'}>_</span>
        </h1>
        <p className={'text-center text-white'}>
          Clique&nbsp;
          <span
            onClick={goToSafeWay}
            className={
              'font-bold text-white hover:text-gray-500 cursor-pointer'
            }
          >
            ici&nbsp;
          </span>
          pour retourner en lieu sûr
        </p>
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
