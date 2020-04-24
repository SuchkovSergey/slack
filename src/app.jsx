// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import socket from 'socket.io-client';
import faker from 'faker';
import cookies from 'js-cookie';
import App from './components/App';
import store from './reducers';
import { messageActions } from './slices/messagesSlice';
import { channelsActions } from './slices/channelsSlice';

const io = socket.connect();

const userName = faker.name.findName();
cookies.set('userName', userName);

// cookies.get('userName'); // => 'value'
// console.log(cookies.get('userName'));


export default (data) => {
  io.on('renameChannel', (response) => {
    store.dispatch(channelsActions.renameChannel({ channel: response.data.attributes }));
  });

  io.on('removeChannel', (response) => {
    store.dispatch(channelsActions.removeChannel({ id: response.data.id }));
  });

  io.on('newChannel', (response) => {
    store.dispatch(channelsActions.addChannel({ channel: response.data.attributes }));
  });

  io.on('newMessage', (response) => {
    store.dispatch(messageActions.addMessage({ message: response.data.attributes }));
  });

  render(
    <Provider store={store}>
      <App data={data} />
    </Provider>,
    document.getElementById('chat'),
  );

  // document.querySelector('input').focus();
};
