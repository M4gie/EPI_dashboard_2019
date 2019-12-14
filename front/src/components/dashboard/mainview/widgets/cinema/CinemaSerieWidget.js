import React, { useCallback, useEffect, useState } from 'react';
import Widget from '../Widget';
import { getParamValue, useInterval } from '../../../../../shared/shared';
import movieService from '../../../../../services/movie';

const CinemaSerieWidget = ({ widget, fetchUserWidgets }) => {
  const [search, setSearch] = useState([]);

  useInterval(() => {
    getSearch();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getSearch = useCallback(() => {
    movieService
      .getSerie(getParamValue(widget, 'Nom de la série', 'Peaky Blinders'))
      .then(async response => {
        await setSearch(response);
      })
      .catch(err => {
        setSearch([]);
        console.log(err);
      });
  }, [widget]);

  useEffect(() => {
    getSearch();
  }, [widget, getSearch]);

  return search && search.length !== 0 ? (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      {search.data.results[0] ? (
        <div className={'flex'}>
          {window.innerWidth > 600 && (
            <div className={'w-1/4'}>
              <img
                alt={'Poster'}
                className={'rounded'}
                src={`https://image.tmdb.org/t/p/w300${search.data.results[0].poster_path}`}
                style={{ maxWidth: 115 }}
              />
            </div>
          )}
          <div
            className={`${window.innerWidth > 600 ? 'w-3/4' : 'w-full'} px-3`}
          >
            <p
              className={
                'leading-none text-2xl font-black tracking-wide mb-0 catamaran truncate'
              }
            >
              {search.data.results[0].name}
            </p>
            <p className={'mb-3 text-sm text-gray-600'}>
              {search.data.results[0].first_air_date}
            </p>
            <div className={'overflow-y-auto'} style={{ height: 120 }}>
              <p>{search.data.results[0].overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>
          Cette série n&apos;existe pas ou il y a eu une erreur lors de la
          requête.
        </p>
      )}
    </Widget>
  ) : (
    <Widget widget={widget} fetchUserWidgets={fetchUserWidgets}>
      <div className={'flex text-center mx-auto text-gray-800'}>
        <p>
          La recherche indiquée en paramètre n&apos;existe pas ou il y a eu une
          erreur lors de la requête.
        </p>
      </div>
    </Widget>
  );
};

export default CinemaSerieWidget;
