import React, { useRef, useState } from 'react';
import "./Contact.scss";
import emailjs from "@emailjs/browser";
export default function Contact() {
  const contactForm = useRef();
  const [isSended, setSended] = useState();

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(
      'service_5829vuk',
      'template_q78nd2t', 
      contactForm.current, 
      '9qkU4FuIKbtie8vlh'
    ).then(res => {
      document.getElementById('contact-form').reset();
      setSended(true);
    },
    err => {
      console.log(err)
    }
    );
  }

  console.log(isSended)

  return (
    <section className="contact">
      <div className="overlay"></div>
      <h1>Contacto</h1>
      <div className="contact-container">
        <div className="contact-form">
          <form ref={contactForm} onSubmit={sendEmail} id="contact-form">
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="Nombre" name="name"/>
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder="Email" name="email"/>
            </div>
            <div className="form-group">
              <input type="phone" className="form-control" id="phone" placeholder="Teléfono" name="phone"/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="company" placeholder="Empresa" name="empresa"/>
            </div>
            <div className="form-group textarea">
              <textarea className="form-control" id="message" placeholder="Mensaje" rows={5} name="message"/>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="politica">He leído y Acepto la Poítica de Privacidad</label>
            </div>
            <button type="submit" className="button black">Enviar</button>
            {isSended === true &&
              <div className="w-100">
                <p>El mensaje se ha enviado correctamente</p>
              </div>
            }
          </form>

 
        </div>
        <div className="contact-box">
          <p className="phone">(+34) 695289168</p>
          <p className="time">disponible de 10:00 – 18:00</p>
          <p className="email"><span>email</span> alejandro@bigmentar.com</p>
        </div>
      </div>
      
    </section>
  );
}