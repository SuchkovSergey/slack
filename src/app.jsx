// @ts-check
import i18next from 'i18next';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import faker from 'faker';
import cookies from 'js-cookie';
import resources from './locales';
import App from './components/App';
import store from './reducers';
import listenSocket from './webSockets';

const userName = faker.name.findName();
// const userName = prompt('Your name, dear')
// console.log(userName);

cookies.set('userName', userName.toString()); // cookies.get('userName');

export default (data) => {
  i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  listenSocket();

  render(
    <Provider store={store}>
      <App data={data} />
    </Provider>,
    document.getElementById('chat'),
  );
};
