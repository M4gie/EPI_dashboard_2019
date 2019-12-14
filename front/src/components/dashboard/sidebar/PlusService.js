import React, { useEffect, useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import NewWindow from 'react-new-window';
import 'react-toastify/dist/ReactToastify.css';
import RoundedButton from '../../buttons/RoundedButton';
import serviceService from '../../../services/service';
import userServices from '../../../services/user';
import { modalStyles, CircleBackground } from '../../../styles/styled';
import loginServices from '../../../services/login';
import { getToken } from '../../../shared/shared';

const PlusView = ({ handleUpdate }) => {
  const [authWindow, setAuthWindow] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 25,
      left: '50%',
      height: '65px',
      width: '65px'
    }
  });

  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    if (modalOpen === false) return;
    serviceService
      .services()
      .then(response => {
        setServicesList(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e, doStop) => {
    if (doStop) e.stopPropagation();
    setModalOpen(false);
  };

  const checkAuth = async service => {
    const token = await getToken(service);
    if (token.github_token !== null) return 0;
    else
      loginServices
        .loginService(service)
        .then(response => {
          setAuthWindow(<NewWindow url={response} />);
          return 0;
        })
        .catch(err => {
          console.log(err);
          return 1;
        });
  };

  const subscribe = async (e, service) => {
    if (service.auth) {
      if ((await checkAuth(service.name)) === 1) {
        return;
      }
    }
    userServices
      .subscribeService(service.id)
      .then(() => {
        toast.success('Le service a bien été ajouté !', {
          position: toast.POSITION.TOP_RIGHT
        });
        closeModal(e, false);
        handleUpdate();
      })
      .catch(err => {
        console.log(err);
        toast.error(
          "Il y a eu une erreur lors de l'inscription au service...",
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  return (
    <div className={css(styles.container)} onClick={() => openModal()}>
      {authWindow}
      <CircleBackground
        additionalcss={'position: relative; left: -50%;'}
        image={process.env.PUBLIC_URL + '/assets/plus.jpg'}
      />

      <Modal
        isOpen={modalOpen}
        onRequestClose={e => closeModal(e, true)}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <div className={'mb-5'}>
          <h2 className={'mb-6 font-2xl font-bold text-center uppercase'}>
            Ajouter un service
          </h2>
          {servicesList.length === 0 ? (
            <p>Pas de services disponibles</p>
          ) : (
            servicesList.map(service => {
              return (
                <RoundedButton
                  key={service.id}
                  handleClick={e => subscribe(e, service)}
                  buttonStyle={
                    'hover:text-blue-800 w-full my-1 text-white bg-blue-800 border-blue-800 text-bold mx-2'
                  }
                  text={`Service ${service.name}`}
                />
              );
            })
          )}
        </div>
        <div className="text-center">
          <RoundedButton
            handleClick={e => closeModal(e, true)}
            buttonStyle={'hover:text-gray-600 bg-white border-white text-bold'}
            text={'Fermer'}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PlusView;
