import React, { useEffect, useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ServiceIcon from './ServiceIcon';
import PlusView from './PlusService';
import userServices from '../../../services/user';

const SideBar = ({ fetchUserWidgets }) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: 85,
      position: 'fixed',
      zIndex: 1,
      top: 0,
      left: 0,
      overflowX: 'hidden',
      boxShadow: 'gray 2px 0px 6px'
    },
    sidebar: {
      backgroundColor: '#232b44',
      overflowX: 'hidden',
      height: '100%',
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 10,
      color: 'white',
      position: 'relative'
    }
  });

  const [services, setServices] = useState([]);

  const fetchUserServices = () => {
    userServices
      .services()
      .then(response => {
        setServices(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserServices();
  }, []);

  return (
    <div className={css(styles.container) + ` z-0`}>
      <div className={css(styles.sidebar)}>
        {services.map((service, index) => {
          return (
            <ServiceIcon
              key={service.id}
              index={index}
              service={service}
              fetchUserServices={fetchUserServices}
              fetchUserWidgets={fetchUserWidgets}
            />
          );
        })}
        <PlusView handleUpdate={fetchUserServices} />
      </div>
    </div>
  );
};

export default SideBar;
