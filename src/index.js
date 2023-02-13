import React from './react'
import ReactDom from './react-dom';

/**@jsx React.createElement */
const element = <div key="title" id="title" style={{ border: '1px solid red' }}>hello</div>;

console.log("element", element)

const rootContainer = document.getElementById("root")

ReactDom.render(element, rootContainer)