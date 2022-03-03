import React, {Component} from "react";

export default function Title(props) {

  return (
    <div className="title w-100">
      <h1>{props.title}</h1>
      <hr className="w-75 m-auto mb-3" />
    </div>
  );
}