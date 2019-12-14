import React from 'react';
import GithubOwnReposWidget from './GithubOwnReposWidget';
import GithubOwnFavsWidget from './GithubOwnFavsWidget';
import GithubOwnFollowersWidget from './GithubOwnFollowersWidget';

const GithubWidgets = ({ widget, fetchUserWidgets }) => {
  return (
    widget && (
      <div>
        {widget.widgetName === 'ownrepos' && (
          <GithubOwnReposWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
        {widget.widgetName === 'ownstars' && (
          <GithubOwnFavsWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
        {widget.widgetName === 'ownfollowers' && (
          <GithubOwnFollowersWidget
            widget={widget}
            fetchUserWidgets={fetchUserWidgets}
          />
        )}
      </div>
    )
  );
};

export default GithubWidgets;
