import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  faFacebookF,
  faGithubAlt,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import NewWindow from 'react-new-window';
import RoundedButton from '../buttons/RoundedButton';
import loginServices from '../../services/login';
import RoundedIcon from '../buttons/RoundedIcon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authWindow, setAuthWindow] = useState('');
  const history = useHistory();

  const connect = e => {
    e.preventDefault();
    loginServices
      .login(email, password)
      .then(response => {
        Cookies.set('u_token', response.access_token.token);
        history.push('/dashboard');
      })
      .catch(error => {
        toast.error(
          error.data ? error.data[0].message : 'Erreur lors de la connexion',
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  const connectService = (e, service) => {
    e.preventDefault(e);
    loginServices
      .loginService(service)
      .then(response => {
        setAuthWindow(
          <NewWindow
            url={response}
            onUnload={() => history.push('/dashboard')}
          />
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const styles = StyleSheet.create({
    'form-content': {
      margin: '20px 0'
    },
    'form-input': {
      width: '100%',
      color: 'white',
      backgroundColor: 'transparent',
      margin: '10px 0',
      border: 'none',
      borderBottom: '2px lightgrey solid',
      transition: '0.3s ease',
      ':focus': {
        outline: 'none',
        borderBottom: '2px solid #6787FC',
        transition: '0.3s ease'
      }
    },
    signin: {
      cursor: 'pointer',
      ':hover': {
        color: 'lightgrey'
      }
    },
    textwithline: {
      width: '100%',
      textAlign: 'center',
      borderBottom: '1px solid #5e6b84',
      color: '#91a5cc',
      lineHeight: '0.1em',
      margin: '45px 0 20px'
    },
    linetext: {
      background: '#293152',
      padding: '0px 10px'
    }
  });

  return (
    <>
      <h1 className={'font-semi-bold text-l text-center mb-12'}>
        Connectez-vous à <span className={'font-bold'}>Underscore</span> et
        profitez de toutes ses fonctionnalités !
      </h1>
      {authWindow}
      <section>
        <form className={css(styles['form-content'])}>
          <label className={'text-gray-500'}>Adresse e-mail</label>
          <input
            onChange={e => setEmail(e.target.value)}
            className={css(styles['form-input'])}
            type={'text'}
            value={email}
          />
          <label className={'text-gray-500'}>Mot de passe</label>
          <input
            onChange={e => setPassword(e.target.value)}
            className={css(styles['form-input'])}
            type={'password'}
            value={password}
          />
          <div className={'text-center my-3'}>
            <RoundedButton
              handleClick={connect}
              buttonStyle={'hover:text-white bg-white border-white text-bold'}
              text={'Se connecter'}
            />
          </div>

          <h2 className={'mt-10 ' + css(styles.textwithline)}>
            <span className={css(styles.linetext)}>OU</span>
          </h2>
          <div className={'text-center my-3'}>
            <RoundedIcon
              handleClick={connectService}
              param={'facebook'}
              buttonStyle={
                'hover:text-white bg-white border-white text-bold mx-3'
              }
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </RoundedIcon>
            <RoundedIcon
              handleClick={connectService}
              param={'google'}
              buttonStyle={
                'hover:text-white bg-white border-white text-bold mx-3'
              }
            >
              <FontAwesomeIcon icon={faGoogle} />
            </RoundedIcon>
            <RoundedIcon
              handleClick={connectService}
              param={'github'}
              buttonStyle={
                'hover:text-white bg-white border-white text-bold mx-3'
              }
            >
              <FontAwesomeIcon icon={faGithubAlt} />
            </RoundedIcon>
          </div>
        </form>
      </section>
      <section className={'my-3'}>
        <p className={'text-center'}>
          Pas encore de compte ?&nbsp;
          <Link
            className={
              'font-bold text-white hover:text-gray-500 cursor-pointer'
            }
            to="/register"
          >
            Inscris-toi
          </Link>
          &nbsp; !
        </p>
      </section>
    </>
  );
};

export default Login;
