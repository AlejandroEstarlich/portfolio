import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from '../slider/Slider';
import Proyectos from '../proyectos/Proyectos';
import About from '../about/About';

export default function Home(props) {

  return (
    <>
      <Slider title="Alejandro Estarlich" size="big" image={process.env.PUBLIC_URL + '/images/Alejandroestarlich-bg00.jpg'}/>
      <Proyectos />
      <About />
    </>
  );
}