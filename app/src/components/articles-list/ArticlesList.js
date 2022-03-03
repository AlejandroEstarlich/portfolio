import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import Title from '../title/Title';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../../Global';
import { Link, useParams } from 'react-router-dom';
import './ArticlesList.scss';
import Sidebar from '../sidebar/Sidebar';
import Paginate from '../paginate/Paginate';

export default function ArticlesList(props) {
  const url_to_search = Global.url;
  const params = useParams();
  const [data, setData] = useState({ hits: [] });
  const [propsToUse, setPropsToUse] = useState([]);
  const [paramsToUse, setParamsToUse] = useState(params.search);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    url_to_search+"articles/"+props.filter,
  );

  
  const paginate = pageNum => setPage({currentPage: pageNum, articlesPerPage: articlesPerPage});
  const nextPage = () =>  setPage({currentPage: currentPage + 1, articlesPerPage: articlesPerPage});
  const prevPage = () => setPage({currentPage: currentPage - 1, articlesPerPage: articlesPerPage});

  const [page, setPage] = useState({ 
    loading: false,
    currentPage: 1,
    articlesPerPage: 3
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Llamamos a la base de datos
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
        setData({
          status: 'failed'
        })
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  

  if(data.articles && data.status === 'success') {
    var totalArticles = data.articles.length;
    var { currentPage, articlesPerPage } = page;
    const indexOfLastArticle =  currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    
    const current_articles = data.articles.slice(indexOfFirstArticle, indexOfLastArticle);

    var articles_to_show = current_articles.map((article) => {
      return (
        <Card key={article._id} title={article.title} url={'/project/'+article._id} image={url_to_search+'get-image/'+article.image}/>
      );
    });
  } else if(!data.articles || data.status === 'error') {
    var articles_to_show = <p>Todavía no hay proyectos</p>;
  } else {
    var articles_to_show = <p>Cargando proyectos...</p>;
  }
  return(
    <>
      <section className="articles">
        <div className="articles-list">
          {articles_to_show}
        </div>
        <Paginate articlesPerPage={page.articlesPerPage} totalArticles={totalArticles} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={page.currentPage} />
      </section>
    </>
  )
}