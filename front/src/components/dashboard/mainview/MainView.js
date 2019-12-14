import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import HeaderDb from '../header/HeaderDb';
import WidgetsContainer from './widgets/WidgetsContainer';
import AddWidget from './widgets/AddWidget';
import { useWindowSize } from '../../../shared/shared';

const MainView = ({ fetchUserWidgets, sortedList, setSortedList }) => {
  const styles = StyleSheet.create({
    mdMainView: {
      paddingLeft: '40px',
      paddingRight: '40px',
      marginLeft: 85,
      position: 'relative',
      height: '100vh'
    },
    smMainView: {
      paddingLeft: '3px',
      paddingRight: '3px',
      marginLeft: 85,
      position: 'relative',
      height: '100vh'
    }
  });

  const [columns, setColumns] = useState(3);

  const ShowColumns = () => {
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();
    if (width < 1050 && columns !== 1) setColumns(1);
    else if (width >= 1050 && width <= 1470 && columns !== 2) setColumns(2);
    else if (width > 1470 && columns !== 3) setColumns(3);
    return '';
  };

  return (
    <div
      className={
        columns >= 2
          ? css(styles.mdMainView)
          : css(styles.smMainView) + ` bg-gray-200`
      }
    >
      {ShowColumns()}
      <HeaderDb />
      <AddWidget fetchUserWidgets={fetchUserWidgets} />
      <WidgetsContainer
        sortedList={sortedList}
        setSortedList={setSortedList}
        fetchUserWidgets={fetchUserWidgets}
        columns={columns}
      />
    </div>
  );
};

export default MainView;
