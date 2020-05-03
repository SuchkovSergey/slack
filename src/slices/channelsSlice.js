/* eslint no-param-reassign: "error" */
import update from 'immutability-helper';
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { byId: {}, activeId: 0 },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.byId = { ...state.byId, [channel.id]: channel };
      state.activeId = channel.id;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.byId = update(state.byId, { $unset: [id] });
    },
    renameChannel: (state, { payload: { channel: { id, name } } }) => {
      state.byId[id].name = name;
    },
    selectChannel: (state, { payload: { id } }) => {
      state.activeId = id;
    },
  },
});

export default channelsSlice.actions;
export const { reducer } = channelsSlice;
