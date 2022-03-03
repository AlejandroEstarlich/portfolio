import React from 'react';
// import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { HashLink as Link } from 'react-router-hash-link';
import "./Slider.scss";

export default function Slider(props) {

  return (
    <section className={props.size + " slider w-100"} style={{backgroundImage: `url(${props.image})`}}>
      <div className="overlay"></div>
      <div className="slider-title">
        <h1>{ props.title }</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path></svg>
      </div>
      {props.size === "big" &&
        <div className="slider-box">
          <h2 className="slider-subtitle">I am... 
            <span>
              <Typewriter
                options={{
                  strings: [' Developer', ' Programmer', ' Creator'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
          <div className="slider-buttons">
            <Link to="#proyectos" className="button black">Ver mis proyectos</Link>
          </div>
        </div>
      }
        
    </section>
  );
}