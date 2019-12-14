import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import RoundedButton from '../buttons/RoundedButton';
import loginServices from '../../services/login';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const history = useHistory();

  const register = e => {
    e.preventDefault();
    loginServices
      .register(email, password, passwordConfirm)
      .then(() => {
        toast.success('Ton compte a bien été créé !', {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push('/login');
      })
      .catch(err => {
        console.log(err);
        toast.error(
          err.data
            ? err.data[0].message
            : 'Erreur lors de la création du compte',
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
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
    }
  });

  return (
    <>
      <h1 className={'font-semi-bold text-l text-center mb-12'}>
        Enregistre-toi sur <span className={'font-bold'}>Underscore</span> pour
        faire partie de l&apos;élite !
      </h1>
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
          <label className={'text-gray-500'}>Confirmer le mot de passe</label>
          <input
            onChange={e => setPasswordConfirm(e.target.value)}
            className={css(styles['form-input'])}
            type={'password'}
            value={passwordConfirm}
          />
          <div className="text-center my-3">
            <RoundedButton
              handleClick={register}
              buttonStyle={'hover:text-white bg-white border-white'}
              text={"S'enregistrer"}
            />
          </div>
        </form>
      </section>
      <section className={'my-3'}>
        <p className={'text-center'}>
          Déjà un compte ?&nbsp;
          <Link
            className={
              'font-bold text-white hover:text-gray-300 cursor-pointer'
            }
            to="/login"
          >
            Connecte-toi
          </Link>
          &nbsp; !
        </p>
      </section>
    </>
  );
};

export default Register;
