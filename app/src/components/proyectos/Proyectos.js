import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import "./Proyectos.scss";

export default function Proyectos(props) {

  return (
    <section className="proyectos" id="proyectos">
      <h2>Mis proyectos</h2>
      <div className="proyectos-container">
        <Card title="Web Corporativa" image={process.env.PUBLIC_URL + '/images/corporativo-peq.jpg'} text="Diseño y Desarrollo Web para empresas y asociaciones" url="/web-corporativa" />
        <Card title="Ecommerce" image={process.env.PUBLIC_URL + '/images/tienda-peq.jpg'} text="Diseño y Desarrollo de tiendas online" url="/ecommerce" />
        <Card title="Software" image={process.env.PUBLIC_URL + '/images/dev-peq.jpg'} text="Desarrollo web y software FullStack con FrameWorks JS" url="/software" />
      </div>
    </section>
  );
}