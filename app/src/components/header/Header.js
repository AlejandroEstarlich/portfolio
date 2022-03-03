import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Header.scss";

export default function Header() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if(window.scrollY > 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBackground);
  
  return(
    <header className={navbar ? 'navbar navbar-expand-lg sticky' : 'navbar navbar-expand-lg'}>
      <nav className="w-75 m-auto">
        <div className="container-fluid">
          <div className="navbar" id="navbarExample01">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink className="nav-link" aria-current="page" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://bigmentar.com/">Bigmentar</a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}