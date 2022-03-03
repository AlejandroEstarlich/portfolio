import React, { useState, useEffect } from 'react';
import Title from '../title/Title';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../../Global';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './ArticleDetail.scss';
import Sidebar from '../sidebar/Sidebar';

export default function ArticleDetail(props) {
  const url_to_search = Global.url;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ hits: [] });
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    url_to_search+"article/" + params.id,
  );
  
  
  var article = '';
  var article_title = '';

  function deleteArticle() {
    swal({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que quieres borrar este proyecto?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        setOrder('delete');
        setUrl(url_to_search + "article/" + params.id);
        swal(
          'Proyecto borrado',
          'El proyecto se ha borrado con éxito',
          'success'
        )
      } else {
        swal("¡A salvo!", "El proyecto está a salvo");
      }
    });

  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        var result;
        switch(order) {
          case 'put': 
            result = await axios.put(url);
          break;
          case 'delete':
            result = await axios.delete(url);
          break;
          default:
            result = await axios(url);
          break;
        }
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  

  if(data.status === 'deleted') { navigate('/');}

  if(data.article != null) {

    var article_data = data.article;
    
    article_title = article_data.title;
    article = (
      <section className="article" style={{backgroundImage: `url(${url_to_search+'get-image/'+article_data.image})`}}>
        <div className="overlay"></div>
        <div key={article_data._id} className="article-detail">
          <div className="article-detail-content">
            <div className="article-text">
              <h3 className="mt-5">{article_data.title}</h3>
              <p><b>{article_data.technologies}</b></p>
              <p className="parrafo">{article_data.content}&quot;</p>
            </div>
            {article_data.image &&
              <div className="article-image">
                <img className="w-100" alt={article_data.title} src={url_to_search+'get-image/'+article_data.image} />
              </div>
            }
          </div>
          <button onClick={
            () => {
              deleteArticle();
            }
            } className="button btn-danger m-2">Borrar proyecto</button>
          <button onClick={
            () => {
              navigate('/edit-project/'+article_data._id);
            }
          } className="button btn-success m-2">Editar proyecto</button>
          
        </div>
      </section>
      
    );
  } else if(data.article === undefined) {
    article = <p>No existe este artículo</p>;
  } else {
    article = <p>Cargando artículo...</p>;
  }
    return(
      <>
        
        {article}
      </>
    )
}