import React from 'react';

const Footer = () => {
  return (
    <footer
      className={
        'absolute bottom-0 left-0 w-full text-gray-500 py-5 px-3 text-center'
      }
    >
      <p>
        Créé par&nbsp;
        <a
          rel="noreferrer"
          className={'font-bold text-white hover:text-gray-500 cursor-pointer'}
          href={'https://www.linkedin.com/in/steeven-regnault/'}
          target={'_blank'}
        >
          Steeven REGNAULT&nbsp;
        </a>
        et&nbsp;
        <a
          rel="noreferrer"
          className={'font-bold text-white hover:text-gray-500 cursor-pointer'}
          href={'https://www.linkedin.com/in/julien-montagne/'}
          target={'_blank'}
        >
          Julien MONTAGNE&nbsp;
        </a>
        - {'{'} EPITECH Lille {'}'}
      </p>
    </footer>
  );
};

export default Footer;
