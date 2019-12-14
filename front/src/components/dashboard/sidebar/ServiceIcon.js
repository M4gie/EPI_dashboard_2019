import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { CircleBackground } from '../../../styles/styled';
import userServices from '../../../services/user';

const ServiceIcon = ({
  service,
  index,
  fetchUserServices,
  fetchUserWidgets
}) => {
  const [isOver, setIsOver] = useState(false);

  const removeService = () => {
    userServices
      .deleteService(service.id)
      .then(() => {
        toast.success('Le service a bien été supprimé !', {
          position: toast.POSITION.TOP_RIGHT
        });
        fetchUserServices();
        fetchUserWidgets();
      })
      .catch(err => {
        console.log(err);
        toast.error(
          'Il y a eu une erreur lors de la suppression du service...',
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  return (
    <div>
      <div
        onClick={() => removeService()}
        onMouseLeave={() => {
          setIsOver(false);
        }}
        onMouseOver={() => {
          setIsOver(true);
        }}
        className={'relative'}
        style={{ marginTop: index * 80 }}
      >
        <CircleBackground
          additionalcss={'position: absolute; top: 0; left: 0;'}
          image={
            service
              ? process.env.PUBLIC_URL +
                `/assets/logos/${service.service.banner}.jpg`
              : process.env.PUBLIC_URL + '/assets/logos/wikipedia.jpg'
          }
        />
        {isOver && (
          <div
            className={
              'pointer-events-none top-0 left-0 absolute text-red-600 transition-2 cursor-pointer w-full h-full text-center mt-2'
            }
          >
            <FontAwesomeIcon icon={faTimes} size={'4x'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceIcon;
