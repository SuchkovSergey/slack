import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './Channels.jsx';
import Header from './Header.jsx';

const app = (data) => {
  const mountNode = document.querySelector('body');
  ReactDOM.render(<Header />, mountNode);
  ReactDOM.render(<Channels data={data} />, mountNode);
};

export default app;


// gon.channels - обращаемся к списку каналов
// <ListGroup.Item as="li" active>Cras justo odio</ListGroup.Item>\
// const mountNode = document.getElementById('react-root');
