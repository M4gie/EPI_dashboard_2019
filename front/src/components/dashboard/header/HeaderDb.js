import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from '../../buttons/RoundedButton';
import { modalStyles } from '../../../styles/styled';

const HeaderDb = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const disconnect = () => {
    Cookies.remove('u_token');
    history.push('/login');
  };

  return (
    <div
      className={
        'w-full bg-black mr-20 rounded-b bg-white shadow-xl px-6 py-8 z-10'
      }
    >
      <div className={'inline-block'}>
        <h1 className={'text-xl md:text-3xl font-bold uppercase'}>
          Mon Dashboard<span className={'text-gray-600'}> Underscore</span>
        </h1>
      </div>
      <div
        className={
          'h-full justify-center inline-block float-right cursor-pointer hover:text-gray-600 transition-2'
        }
      >
        <span
          onClick={() => openModal()}
          className={
            'hover:text-gray-700 transition-2 text-gray-600 text-xl md:text-2xl font-bold uppercase'
          }
        >
          <FontAwesomeIcon icon={faSignOutAlt} size={'lg'} />
        </span>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => closeModal()}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <div className={'mb-5'}>
          <h2 className={'font-2xl font-bold text-center uppercase'}>
            Voulez-vous
          </h2>
          <h3 className={'font-xl text-center'}>vraiment vous déconnecter ?</h3>
        </div>
        <div className={'flex'}>
          <RoundedButton
            handleClick={() => disconnect()}
            buttonStyle={
              'hover:text-blue-900 bg-blue-900 border-blue-900 text-bold mx-2 text-white flex-1'
            }
            text={'Se déconnecter'}
          />
          <RoundedButton
            handleClick={() => closeModal()}
            buttonStyle={
              'hover:text-gray-600 bg-white border-white text-bold mx-2 flex-1'
            }
            text={'Fermer'}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HeaderDb;
