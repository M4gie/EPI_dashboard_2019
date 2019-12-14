import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import userServices from '../../../../../services/user';
import { modalStyles } from '../../../../../styles/styled';
import RoundedButton from '../../../../buttons/RoundedButton';

const DeleteWidget = ({ widget, fetchUserWidgets }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e, doStop) => {
    if (doStop) e.stopPropagation();
    setModalOpen(false);
  };

  const deleteWidget = () => {
    userServices
      .deleteUserWidget(widget.idUserWidget)
      .then(() => {
        toast.success('Le widget a bien été supprimé !', {
          position: toast.POSITION.TOP_RIGHT
        });
        closeModal(undefined, false);
        fetchUserWidgets();
      })
      .catch(() => {
        toast.error(
          'Il y a eu une erreur lors de la suppression du widget...',
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  return (
    widget && (
      <div className={'flex-1'}>
        <FontAwesomeIcon
          onClick={() => openModal()}
          className={
            'text-white transition-2 cursor-pointer hover:text-gray-400'
          }
          icon={faTimes}
        />
        <Modal
          isOpen={modalOpen}
          onRequestClose={e => closeModal(e, true)}
          contentLabel="Example Modal"
          style={modalStyles}
        >
          <h2 className={'mb-6 font-2xl font-bold text-center uppercase'}>
            Supprimer le widget {widget.id}
          </h2>
          <div className={'flex'}>
            <RoundedButton
              handleClick={() => deleteWidget()}
              buttonStyle={
                'hover:text-blue-900 bg-blue-900 border-blue-900 text-bold mx-2 text-white flex-1'
              }
              text={'Supprimer'}
            />
            <RoundedButton
              handleClick={e => closeModal(e, true)}
              buttonStyle={
                'hover:text-gray-600 bg-white border-white text-bold mx-2 flex-1'
              }
              text={'Fermer'}
            />
          </div>
        </Modal>
      </div>
    )
  );
};

export default DeleteWidget;
