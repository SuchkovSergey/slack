import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { byId: [], activeId: 0 },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      const { byId } = state;
      return {
        byId: byId.push(channel),
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
    renameChannel(state, action) { // рефакторинг
      const { id, newName } = action.payload;
      const { byId } = state;
      const channel = byId.find((el) => el.id === id);
      const index = byId.indexOf(channel); // нашли индекс в массиве
      const newStat = [...byId];
      const renamedChannel = { ...channel, name: newName };// вероятно, не name
      newStat[index] = renamedChannel;
      return {
        ...state,
        byId: newStat,
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
