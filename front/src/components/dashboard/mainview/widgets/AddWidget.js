import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from '../../../buttons/RoundedButton';
import userServices from '../../../../services/user';
import { modalStyles } from '../../../../styles/styled';

const AddWidget = ({ fetchUserWidgets }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    userServices
      .getUserWidgets()
      .then(response => {
        setWidgets(response);
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

  const addWidget = (e, serviceUserId, widgetId) => {
    userServices
      .addUserWidget(serviceUserId, widgetId)
      .then(() => {
        fetchUserWidgets();
        closeModal(e);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <h1 className={'text-gray-600 font-bold text-xl mt-5 mb-2'}>
      &nbsp;Mes widgets{' '}
      <span
        className={
          'cursor-pointer hover:text-gray-700 transition-2 text-gray-600'
        }
        onClick={() => openModal()}
      >
        <Modal
          isOpen={modalOpen}
          onRequestClose={e => closeModal(e, true)}
          contentLabel="Example Modal"
          style={modalStyles}
        >
          <h2 className={'mb-6 font-2xl font-bold text-center uppercase'}>
            Ajouter un widget
          </h2>
          {widgets.length === 0 ? (
            <p>
              Pas de widgets disponibles. Assurez-vous que vous êtes inscrits à
              un ou plusieurs services.
            </p>
          ) : (
            widgets.map((service, index) => {
              return (
                <div key={index}>
                  <h1 className={'font-bold uppercase font-2xl'}>
                    {service.name}
                  </h1>
                  {service.widgets.map(widget => {
                    return (
                      <RoundedButton
                        key={widget.id}
                        handleClick={e =>
                          addWidget(e, service.serviceUsers[0].id, widget.id)
                        }
                        buttonStyle={
                          'hover:text-blue-800 w-full my-1 text-white bg-blue-800 border-blue-800 text-bold mx-2'
                        }
                        text={widget.description}
                      />
                    );
                  })}
                </div>
              );
            })
          )}
          <div className="text-center">
            <RoundedButton
              handleClick={e => closeModal(e, true)}
              buttonStyle={
                'hover:text-gray-600 bg-white border-white text-bold'
              }
              text={'Fermer'}
            />
          </div>
        </Modal>
        <FontAwesomeIcon icon={faPlusCircle} />
      </span>
    </h1>
  );
};

export default AddWidget;
