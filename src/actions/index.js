import { createAction } from 'redux-actions';
import { createSlice, configureStore } from '@reduxjs/toolkit';


export const addMessage = createAction('MASSAGE_ADD');

export const addChannel = createAction('CHANNEL_ADD');
export const deleteChannel = createAction('DELETE_ADD');


// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState: 0,
//   reducers: {
//     addMessage: (state) => state + 1,
//   },
// });

// const reducers = configureStore({
//   reducer: messagesSlice.reducer,
// });

// const reducers = configureStore({
//   reducer: rootReducer,
// });


// document.getElementById('increment').addEventListener('click', () => {
//   store.dispatch(counterSlice.actions.increment())
// })
