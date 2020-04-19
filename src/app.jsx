import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './Channels';
// import Header from './Header';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const app = (data) => {
  const mountNode = document.getElementById('chat');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container-fluid', 'h-100', 'overflow-hidden');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'h-100', 'pb-3');
  const divElement = document.createElement('div');
  divElement.classList.add('col-md-3', 'border-right');
  const channelsDiv = document.createElement('div');
  channelsDiv.classList.add('channels', 'h-100');

  divElement.append(channelsDiv);
  const rightPartDiv = document.createElement('div');
  const messagesDiv = document.createElement('div');
  const formDiv = document.createElement('div');

  rightPartDiv.classList.add('col-md-9', 'h-100');
  rightPartDiv.append(messagesDiv, formDiv);

  rowDiv.append(divElement, rightPartDiv);
  containerDiv.append(rowDiv);


  ReactDOM.render(<Channels data={data} />, channelsDiv);
  ReactDOM.render(<Messages data={data} />, messagesDiv);
  ReactDOM.render(<NewMessageForm data={data} />, formDiv);
  mountNode.append(containerDiv);
};

export default app;


// gon.channels - обращаемся к списку каналов
// <ListGroup.Item as="li" active>Cras justo odio</ListGroup.Item>\
// const mountNode = document.getElementById('react-root');
