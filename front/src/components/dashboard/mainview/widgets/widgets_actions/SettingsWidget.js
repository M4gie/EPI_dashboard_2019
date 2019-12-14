import React, { useState } from 'react';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { modalStyles } from '../../../../../styles/styled';
import RoundedButton from '../../../../buttons/RoundedButton';
import userServices from '../../../../../services/user';

const SettingsWidget = ({ widget, fetchUserWidgets }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(
    widget &&
      widget.params.map(param => {
        return {
          name: param.name,
          value: param.value,
          type: param.type,
          idParamWidget: param.idParamWidget
        };
      })
  );

  const updateValue = (value, name) => {
    const tmp = data;
    const index = tmp.findIndex(x => x.name === name);
    tmp[index].value = value;
    setData(tmp);
  };

  const handleSave = () => {
    userServices
      .updateUserWidget(widget.idUserWidget, data)
      .then(() => {
        closeModal(undefined, false);
        toast.success('Le widget a bien été mis à jour !', {
          position: toast.POSITION.TOP_RIGHT
        });
        fetchUserWidgets();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e, doStop) => {
    if (doStop === true) e.stopPropagation();
    setModalOpen(false);
  };

  return (
    widget && (
      <div className={'flex-1'}>
        <FontAwesomeIcon
          onClick={() => openModal()}
          className={
            'ml-2 text-white transition-2 cursor-pointer hover:text-gray-400'
          }
          icon={faCogs}
        />
        <Modal
          isOpen={modalOpen}
          onRequestClose={e => closeModal(e)}
          contentLabel="Example Modal"
          style={modalStyles}
        >
          <h2 className={'mb-6 font-2xl font-bold text-center uppercase'}>
            Configurer le widget {widget.id}
          </h2>

          <form>
            {data.map((param, key) => {
              return (
                <div key={key} className={'mb-6'}>
                  <label className={'block'}>{param.name}</label>
                  {param.type === 'string' ? (
                    <input
                      className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      type={'text'}
                      placeholder={param.name}
                      defaultValue={param.value}
                      onChange={e => updateValue(e.target.value, param.name)}
                    />
                  ) : (
                    <input
                      className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      type={'number'}
                      placeholder={param.name}
                      defaultValue={param.value}
                      onChange={e => updateValue(e.target.value, param.name)}
                    />
                  )}
                </div>
              );
            })}
          </form>

          <div className={'flex'}>
            <RoundedButton
              handleClick={() => handleSave()}
              buttonStyle={
                'hover:text-blue-900 bg-blue-900 border-blue-900 text-bold mx-2 text-white flex-1'
              }
              text={'Sauvegarder'}
            />
            <RoundedButton
              handleClick={e => closeModal(e)}
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

export default SettingsWidget;
