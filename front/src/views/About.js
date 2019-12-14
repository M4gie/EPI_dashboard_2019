import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import userServices from '../services/user';

const About = () => {
  const [about, setAbout] = useState({});

  useEffect(() => {
    userServices.about().then(response => {
      setAbout(response);
    });
  }, []);

  return <ReactJson src={about} />;
};

export default About;
