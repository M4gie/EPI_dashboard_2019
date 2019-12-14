import React, { useCallback, useEffect, useState } from 'react';
import githubService from '../../../../../services/github';
import Widget from '../Widget';
import { getParamValue, useInterval } from '../../../../../shared/shared';

const GithubOwnFollowersWidget = ({ widget, fetchUserWidgets }) => {
  const [followers, setFollowers] = useState([]);

  useInterval(() => {
    getFollowers();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getFollowers = useCallback(() => {
    githubService
      .getOwnFollowers()
      .then(async response => {
        await setFollowers(response.data);
      })
      .catch(err => {
        setFollowers([]);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getFollowers();
  }, [widget, getFollowers]);

  return followers && followers.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'overflow-y-auto'} style={{ maxHeight: 175 }}>
        {followers.map((follower, index) => {
          return (
            <div key={index} className={'mt-3'}>
              <img
                src={follower.avatar_url}
                width={30}
                height={30}
                alt={'Profil'}
                className={'inline-block'}
              />
              <a
                rel="noreferrer"
                href={follower.html_url}
                target={'_blank'}
                className={
                  'catamaran inline-block font-bold text-lg hover:text-gray-600 transition-2 cursor-pointer inline-block ml-3'
                }
              >
                {follower.login}
              </a>
              <hr className={'mt-3'} />
            </div>
          );
        })}
      </div>
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          Vous n&apos;avez pas de followers ou il y a eu une erreur lors de la
          requête.
        </p>
      </div>
    </Widget>
  );
};

export default GithubOwnFollowersWidget;
