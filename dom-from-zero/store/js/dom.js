'use strict';

function createElement(node) {
  if (typeof node === 'string') return document.createTextNode(node);

  const element = document.createElement(node.name);

  if (node.props instanceof Object) {
    Object.keys(node.props).forEach(i => {
      element.setAttribute(i, node.props[i])
    });
  }

  if (node.childs instanceof Array) {
    for (const child of node.childs) {
      element.appendChild(createElement(child))
    }
  }

  return element;
}