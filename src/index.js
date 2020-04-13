// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
// import app from './app.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = () => {
  const mountNode = document.querySelector('body');
  const el = document.createElement('div');
  el.textContent = 'works';
  mountNode.append(el)
};

console.log('it works!');
console.log('gon', gon);
// app(gon);
app();
