import socket from 'socket.io-client';
import store from './reducers';
import messageActions from './slices/messagesSlice';
import channelsActions from './slices/channelsSlice';

export default () => {
  const { addMessage } = messageActions;
  const { addChannel, renameChannel, removeChannel } = channelsActions;

  socket
    .connect()
    .on('newMessage', (response) => {
      store.dispatch(addMessage({ message: response.data.attributes }));
    })
    .on('newChannel', (response) => {
      store.dispatch(addChannel({ channel: response.data.attributes }));
    })
    .on('renameChannel', (response) => {
      store.dispatch(renameChannel({ channel: response.data.attributes }));
    })
    .on('removeChannel', (response) => {
      store.dispatch(removeChannel({ id: response.data.id }));
    });
};
