import messageActions from './slices/messagesSlice';
import channelsActions from './slices/channelsSlice';
import store from './reducers';

export default ({ messages, channels }) => {
  const { addMessage } = messageActions;
  const { addChannel, selectChannel } = channelsActions;
  const defaultChannelId = 1;
  messages.forEach((message) => {
    store.dispatch(addMessage({ message }));
  });
  channels.forEach((channel) => {
    store.dispatch(addChannel({ channel }));
  });
  store.dispatch(selectChannel({ id: defaultChannelId }));
};
