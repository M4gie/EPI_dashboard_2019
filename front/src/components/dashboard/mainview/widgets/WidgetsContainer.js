import React from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from 'react-grid-dnd';
import WeatherWidgets from './weather/WeatherWidgets';
import YoutubeWidgets from './youtube/YoutubeWidgets';
import TwitchWidgets from './twitch/TwitchWidgets';
import GithubWidgets from './github/GithubWidgets';
import userServices from '../../../../services/user';
import WikipediaWidgets from './wikipedia/WikipediaWidgets';
import CinemaWidgets from './cinema/CinemaWidgets';

const WidgetsContainer = ({
  sortedList,
  setSortedList,
  fetchUserWidgets,
  columns
}) => {
  const sortList = (sourceIndex, destinationIndex) => {
    const nextState = swap(sortedList, sourceIndex, destinationIndex);
    setSortedList(nextState);
    userServices
      .updateOrder(
        nextState[destinationIndex].idUserWidget,
        nextState[destinationIndex].order
      )
      .then(() => {})
      .catch(err => {
        console.log('err', err);
      });
  };

  const reorderList = (sourceItem, sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = sortedList;
    if (
      list[sourceIndex] === undefined ||
      list[sourceIndex].order === undefined ||
      list[destinationIndex] === undefined ||
      list[destinationIndex].order === undefined
    )
      return;
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      sortList(sourceIndex, destinationIndex);
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1;
      sortList(sourceIndex, destinationIndex);
      return;
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
      sortList(sourceIndex, destinationIndex);
      return;
    }
    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
    sortList(sourceIndex, destinationIndex);
  };

  return (
    sortedList && (
      <div className={'w-full'}>
        {sortedList.length === 0 ? (
          <p className="text-center">Vous n&apos;avez aucun widget.</p>
        ) : (
          <GridContextProvider onChange={reorderList}>
            <GridDropZone
              id="items"
              boxesPerRow={columns}
              rowHeight={300}
              style={{ height: (sortedList.length * 300) / columns }}
            >
              {sortedList.map((item, index) => {
                return (
                  <GridItem key={index} className={'transition-1 select-none'}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      {item.serviceName === 'meteo' && (
                        <WeatherWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                      {item.serviceName === 'youtube' && (
                        <YoutubeWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                      {item.serviceName === 'twitch' && (
                        <TwitchWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                      {item.serviceName === 'github' && (
                        <GithubWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                      {item.serviceName === 'wikipedia' && (
                        <WikipediaWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                      {item.serviceName === 'cinema' && (
                        <CinemaWidgets
                          widget={item}
                          fetchUserWidgets={fetchUserWidgets}
                        />
                      )}
                    </div>
                  </GridItem>
                );
              })}
            </GridDropZone>
          </GridContextProvider>
        )}
      </div>
    )
  );
};

export default WidgetsContainer;
