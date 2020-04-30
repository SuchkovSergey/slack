import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      return [...state, message];
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      return state.filter((el) => el.channelId === id);
    },
  },
});

export default messagesSlice.actions;
export const { reducer } = messagesSlice;
