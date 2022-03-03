import React, {Component} from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
// import { RouterProps } from 'react-router-dom';

import Error from './components/error/Error';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ArticlesList from './components/articles-list/ArticlesList';
import NewArticle from './components/new-article/NewArticle';
import ArticleDetail from './components/article-detail/ArticleDetail';
import Contact from './components/contact/Contact';
import Home from './components/home/Home';
import Articles from './components/articles/Articles';
export default function Router() {

    return(
      // Configurar rutas y páginas
      <BrowserRouter>
        <Header />
        <main className="components">

          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/contacto' element={<Contact />} />
            
            <Route path='/web-corporativa' element={<Articles title="Web Corporativa" image={process.env.PUBLIC_URL + '/images/corporativo-bg.jpg'} filter="corporative"/>} />
            <Route path='/ecommerce' element={<Articles title="Ecommerce" image={process.env.PUBLIC_URL + '/images/tienda-bg.jpg'} filter="ecommerce"/>} />
            <Route path='/software' element={<Articles title="Software" image={process.env.PUBLIC_URL + '/images/dev-bg.jpg'} filter="software"/>} />

            {/* <Route exact path='/search/:search' element={<ArticlesList isSearched={true} title='Search Results' />} /> */}

            <Route exact path='/project/:id' element={<ArticleDetail />} />
            <Route exact path='/edit-project/:id' element={<NewArticle title="Editar Proyecto" />} />
            <Route exact path='/new-project' element={<NewArticle title="Crear proyecto" />} />

            {/* Ruta para error */}
            <Route path="*" element={<Error />} />
          </Routes>

        </main>
        
        <Footer />
      </BrowserRouter>
    );
  }

// export default Router;