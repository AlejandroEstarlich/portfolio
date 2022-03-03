import React, { useState, useEffect } from 'react';
import Title from '../title/Title';
import axios from 'axios';
import Global from '../../Global';
import SimpleReactValidator from 'simple-react-validator';
import './NewArticle.scss';
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewArticle(props) {

  var titleRef = React.createRef();
  var technologiesRef = React.createRef();
  var contentRef = React.createRef();
  var typeRef = React.createRef();

  const url_to_search = Global.url;
  const params = useParams();
  const navigate = useNavigate();
  const validator = new SimpleReactValidator({autoForceUpdate: this});
  const [img, setImg] = useState({ hits: [] });
  const [form, setForm] = useState({ hits: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    url_to_search+"article/"+params.id,
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if(params.id) {
        try {
          var result = await axios(url);
          setForm({
            article: {
              title: result.data.article.title,
              technologies: result.data.article.technologies,
              content: result.data.article.content,
              type: result.data.article.type
            }
          });
        } catch (error) {
          setIsError(true);
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);


  function changeState() {
    setForm({
      article: {
        title: titleRef.current.value,
        technologies: technologiesRef.current.value,
        content: contentRef.current.value,
        type: typeRef.current.value
      },
      img: true
    });

    console.log(form);
  }

  function onFileChange(e) {
    setImg({ articleImg: e.target.files[0] });
  }

  async function createArticle (e) {
    // Evitamos que al página recargue
    e.preventDefault();

    // Llamamos la función para rellenar state en el formulario
    changeState();

    if(validator.allValid()) {
      let query;
      params.id ? query=axios.put(url_to_search+"article/" + params.id, form) : query=axios.post(url_to_search+"save", form.article);

      await query
        .then( res => {
          if(res.data.article) {
            setForm({
              article: res.data.article,
              status: 'waiting'
            })

            // Subir imagen
            if(img.articleImg != null) {

              // Sacar id del artículo
              var article_Id = res.data.article._id;

              // Crear form data para el fichero
              const formData = new FormData();

              formData.append('articleImg', img.articleImg, img.articleImg.name);

              // Petición ajax
              axios.post(url_to_search + 'upload-image/' + article_Id, formData)
                .then(res => {
                  if(res.data.article) {
                    setForm({
                      article: res.data.article,
                      status: 'success'
                    });
                  }
                  else {
                    setForm({
                      article: res.data.article,
                      status: 'failed'
                    });
                  }
                })
                .catch (err => {
                  console.log(err);
                });
            } else {
              setForm({
                status: 'error'
              })
            }
          }
          setForm({
            status: 'success'
          });
          swal(
            'Proyecto creado',
            'El proyecto se ha creado con éxito',
            'success'
          )
        })
        .catch (err => {
          console.log(err);
        });
    } else {
      setForm({
        status: 'failed'
      })
      changeState();
    }
  }

  if(form.status === 'success') { navigate('/') };

  return (
    <section className='form py-5'>
      <Title title={props.title} />

      <form className="w-50 m-auto"  encType="multipart/form-data" onSubmit={createArticle}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input type="text" className="form-control" name="title" id="title" aria-describedby="title" placeholder="Enter article title" onChange={changeState} ref={titleRef} required value={form.article ? form.article.title : ''} />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo de proyecto</label>
          <select className="form-select" name="type" id="type" aria-describedby="type" onChange={changeState} ref={typeRef} required >

            <option value="corporative">Corporativa</option>
            <option value="ecommerce">eCommerce</option>
            <option value="software">Software</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="technologies">Tecnologías</label>
          <input type="text" className="form-control" id="technologies" aria-describedby="technologies" placeholder="Enter article technologies" onChange={changeState} ref={technologiesRef} required value={form.article ? form.article.technologies : ''}/>
        </div>
        <div className="form-group">
          <label htmlFor="image" className="mx-2">Imagen</label>
          <input type="file" className="form-control-file" onChange={onFileChange} name="articleImage" id="image" accept=".jpg,.gif.png.jpeg"/>
        </div>
        <div className="form-group">
          <label htmlFor="content">Descripción</label>
          <textarea rows="20" className="form-control" id="content" aria-describedby="content" placeholder="Enter article content" onChange={changeState} ref={contentRef} required value={form.article ? form.article.content : ''} />
        </div>
        <div className="form-group">
          
          <input type="submit" className="button black" value={params.id ? 'Editar Proyecto' : 'Crear Proyecto'} />
        </div>
        
      </form>
    </section>
  );
}
