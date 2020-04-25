import socket from 'socket.io-client';
import store from './reducers';
import { messageActions } from './slices/messagesSlice';
import { channelsActions } from './slices/channelsSlice';

export default () => {
  const io = socket.connect();

  io.on('newMessage', (response) => {
    store.dispatch(messageActions.addMessage({ message: response.data.attributes }));
  });
  io.on('newChannel', (response) => {
    store.dispatch(channelsActions.addChannel({ channel: response.data.attributes }));
  });
  io.on('renameChannel', (response) => {
    store.dispatch(channelsActions.renameChannel({ channel: response.data.attributes }));
  });
  io.on('removeChannel', (response) => {
    store.dispatch(channelsActions.removeChannel({ id: response.data.id }));
  });
};
