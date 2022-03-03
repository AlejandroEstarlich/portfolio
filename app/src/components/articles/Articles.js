import React from 'react';
import Slider from '../slider/Slider';
import { Link } from 'react-router-dom';
import "./Articles.scss";
import ArticlesList from '../articles-list/ArticlesList';

export default function Articles(props) {

  return (
    <>
      <Slider title={props.title} size="small" image={props.image}/>
      <ArticlesList filter={props.filter} />
    </>

  );
}