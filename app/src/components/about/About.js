import React from 'react';
import "./About.scss";

export default function Proyectos(props) {

  return (
    <section className="about">
      <div className="overlay"></div>
      <div className="about-container">
        <div className="about-text">
          <h2>Sobre mí</h2>
          <p>
            ¡Hola! Soy Alejandro, diseñador y developer web.
          </p>
          <p>
            Me gradué en Comunicación Audiovisual por la Universidad de Valencia, tras cinco años de experiencia en el sector audiovisual, trabajando para Coca-Cola, Warner Bros o RTVE, me especialicé en Diseño y Desarrollo Web y de Aplicaciones Multiplataforma.
          </p>
          <p>
            Desde 2018 he trabajado como freelance para varias empresas en el campo del diseño y desarrollo web, especialmente a través de CMS como WordPress, dominando Elementor, WPBakery y Divi. Pero me he centrad sobre todo en el desarrollo a través de Frameworks de JavaScript (MEAN Stack, MERN Stack y MEVN Stack) y bases de datos no relacionales con NodeJS. 
          </p>
        </div>
        <div className="about-photo">
          <img src={process.env.PUBLIC_URL + '/images/alejandro-bio.png'}></img>
        </div>
      </div>
    </section>
  );
}