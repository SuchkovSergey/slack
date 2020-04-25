import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { byId: [], activeId: 0 },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      const { byId } = state;
      return {
        byId: [...byId, channel],
        activeId: channel.id,
      };
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      const { byId } = state;
      return {
        byId: byId.filter((el) => el.id !== id),
        activeId: 0,
      };
    },
    renameChannel(state, action) {
      const { channel: { id, name } } = action.payload;
      const { byId } = state;
      const renamedChannel = byId.find((el) => el.id === id);
      const index = byId.indexOf(renamedChannel);
      const newById = [...byId];
      newById[index] = { ...renamedChannel, name };
      return {
        ...state,
        byId: newById,
      };
    },
    selectChannel(state, action) {
      const { id } = action.payload;
      return {
        ...state,
        activeId: id,
      };
    },
  },
});

const channelsActions = channelsSlice.actions;
export { channelsActions };
export default channelsSlice.reducer;
