import React, {Component} from 'react';
import './Footer.scss';

class Footer extends Component {
  render() {
    return(
      <footer className="text-center text-white">
        <div className="text-center p-3 footer">
          © 2022 Copyright: 
          <a className="text-white" href="https://alejandroestarlich.es/"> Alejandro Estarlich</a>
        </div>
      </footer>
    );
  }
}

export default Footer;