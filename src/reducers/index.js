import { combineReducers } from 'redux';
// import messageReducer from './messageReducer';
// import channelsReducer from './channelsReducer';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [message.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });




export default combineReducers({
  messages,
});


// const rootReducer = combineReducers({
//   messages: messageReducer,
//   channels: channelsReducer,
// });

// export default rootReducer;
