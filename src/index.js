// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import app from './app.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userName = faker.name.findName(); // value

cookies.set('userName', userName);
cookies.get('userName'); // => 'value'

console.log('it works!');
console.log('gon', gon);
// app(gon);
app(gon);


// const socket = io('http://localhost');
// socket.on('newChannel', (data) => {
//   console.log(data); // выводим информацию о новом канале
// });
