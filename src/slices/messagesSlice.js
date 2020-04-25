import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { byId: {} },
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      const { byId } = state;
      return {
        byId: { ...byId, [message.id]: message },
      };
    },
  },
});
const messageActions = messagesSlice.actions;
export { messageActions };
export default messagesSlice.reducer;
