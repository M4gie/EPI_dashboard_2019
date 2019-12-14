import React, { useEffect, useState } from 'react';
import SideBar from '../components/dashboard/sidebar/SideBar';
import MainView from '../components/dashboard/mainview/MainView';
import userServices from '../services/user';

const Dashboard = () => {
  const [sortedList, setSortedList] = useState([]);

  const fetchUserWidgets = () => {
    userServices
      .widgets()
      .then(response => {
        const tmp = response.map(widget => {
          widget.order = parseInt(widget.order);
          return widget;
        });
        setSortedList(tmp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserWidgets();
  }, []);

  return (
    <div className={'h-screen bg-gray-200'}>
      <SideBar fetchUserWidgets={fetchUserWidgets} />
      <MainView
        sortedList={sortedList}
        setSortedList={setSortedList}
        fetchUserWidgets={fetchUserWidgets}
      />
    </div>
  );
};

export default Dashboard;
