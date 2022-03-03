import React, {Component} from "react";
import './Error.scss';

class Error extends Component {
  render() {
    return (
      <section className="error">
        <div className="overlay"></div>
        <div className="error-text">
          <h1>404</h1>
          <h2>La página que buscas no existe.</h2>
        </div>
      </section>
    );
  }
}
export default Error;