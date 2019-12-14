import React, { useCallback, useEffect, useState } from 'react';
import Widget from '../Widget';
import { getParamValue, useInterval } from '../../../../../shared/shared';
import wikipediaService from '../../../../../services/wikipedia';

const WikipediaSearchWidget = ({ widget, fetchUserWidgets }) => {
  const [search, setSearch] = useState([]);

  useInterval(() => {
    getSearch();
  }, parseInt(getParamValue(widget, 'Rafraîchissement (en secondes)', 20)) * 1000);

  const getSearch = useCallback(() => {
    wikipediaService
      .getSearch(getParamValue(widget, 'Recherche', 'maubeuge'))
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
      <div className={'overflow-y-auto'} style={{ maxHeight: 175 }}>
        {search.data[2] && search.data[2].length > 0 ? (
          search.data[2].map((x, index) => {
            return (
              <div key={index} className={'mt-3'}>
                <h1
                  className={
                    'leading-none text-2xl font-black tracking-wide mb-0 catamaran truncate transition-2 hover:text-gray-600 cursor-pointer'
                  }
                >
                  <a
                    rel="noreferrer"
                    target={'_blank'}
                    href={search.data[3][index]}
                  >
                    {search.data[1][index]}
                  </a>
                </h1>
                <p className={'mb-3'}>
                  {search.data[2][index] ||
                    'Aucun résultat pour cette recherche.'}
                </p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>Aucun résultat pour cette recherche.</p>
        )}
      </div>
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

export default WikipediaSearchWidget;
