// @ts-check

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import socket from 'socket.io-client';
import App from './components/App';
import rootReducer from './reducers';

const io = socket.connect();

export default (data) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

  io.on('newMessage', (response) => {
    const { attributes } = response.data;
    const message = { channelId: 0, id: attributes.id, text: attributes.text };
    console.log('works correct');
    
    store.dispatch(({ type: 'MASSAGE_ADD', payload: { message } }));
  });

  render(
    <Provider store={store}>
      <App data={data} />
    </Provider>,
    document.getElementById('chat'),
  );

  // document.querySelector('input').focus();
};
