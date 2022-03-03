import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import "./Card.scss";

export default function Card(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <section className="card shadow" style={{backgroundImage: `url(${props.image})`}} 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="card-front shadow" >
        <div className="overlay"></div>
        <div className="card-content">
          <h3>{props.title}</h3>

          {isShown &&
            <div className="card hidden">
              <p className="class-text">{props.text}</p>
              <Link className="button black" to={props.url}>Ver proyecto</Link>
            </div>
          }
        </div>
      </div>
    </section>
  );
}