import React, { useCallback, useEffect, useState } from 'react';
import Widget from '../Widget';
import { getParamValue, useInterval } from '../../../../../shared/shared';
import githubService from '../../../../../services/github';

const GithubOwnReposWidget = ({ widget, fetchUserWidgets }) => {
  const [repos, setRepos] = useState([]);

  useInterval(() => {
    getFollowers();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getFollowers = useCallback(() => {
    githubService
      .getOwnRepos(
        getParamValue(
          widget,
          'Ordre des dépôts (ascendant ou descendant)',
          'ascendant'
        )
      )
      .then(async response => {
        await setRepos(response.data);
      })
      .catch(err => {
        setRepos([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getFollowers();
  }, [widget, getFollowers]);

  return repos && repos.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'overflow-y-auto'} style={{ maxHeight: 175 }}>
        {repos.map((repo, index) => {
          return (
            <div key={index} className={'mt-3'}>
              <a
                rel="noreferrer"
                href={repo.html_url}
                target={'_blank'}
                className={
                  'catamaran inline-block font-bold text-lg hover:text-gray-600 transition-2 cursor-pointer'
                }
              >
                {repo.full_name}
              </a>
              <span className={'inline-block text-sm text-gray-600'}>
                &nbsp;{repo.created_at.split('T')[0]}
              </span>
              <p className={'mb-3'}>
                {repo.description || 'Pas de description'}
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          Vous n&apos;avez pas de dépôts ou il y a eu une erreur lors de la
          requête.
        </p>
      </div>
    </Widget>
  );
};

export default GithubOwnReposWidget;
