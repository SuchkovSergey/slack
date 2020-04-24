import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [message.id]: message },
        allIds: [message.id, ...allIds],
      };
    },
  },
});
const messageActions = messagesSlice.actions;
export { messageActions };
export default messagesSlice.reducer;
