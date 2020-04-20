// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';


import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';

import app from './app';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userName = faker.name.findName(); // value

cookies.set('userName', userName);
cookies.get('userName'); // => 'value'

console.log('it works!');
console.log('gon', gon);

app(gon);
